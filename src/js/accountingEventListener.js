import dropDown from '../html/dropdown.js'
import metaD from '../data/metaData.json';

//-------------------------- JQuery ------------------------------------------------
function acceptBtnClicked() {

  if ($("#myModal").attr("funct")=="saveValue") {
    
    let curr = document.getElementById('accounting').getAttribute('CurrencyName')
    var metaData = metaD.columns[curr]

    let targ = $("[data-target='#myModal']")[0];      
    var text = $("#input").val();
    let variable = metaData[targ.id.split("-")[1]]
    var targText = ""

    targText=targ.innerHTML

    if(targText!=text) {
      
      //record update
      let event1 = new CustomEvent("customEvent", {detail: {name: "recordUpdate",target: targ, text: text, trigger: "AcceptB"}})
      document.dispatchEvent(event1);


      if (variable.name == "Date") {

        let event4=new CustomEvent("customEvent",{detail: {name:"historicApiCall", targ: targ, date: text, trigger: "AcceptB"}})
        document.dispatchEvent(event4);

        let UG=document.getElementById(targ.id.split("-")[0]+"-XCH_USD_GBP")

        let event3=new CustomEvent("customEvent",{detail: {name:"valueCalculation", target: UG, trigger: "AcceptB"}})
        document.dispatchEvent(event3);
      }

      if (variable.calcBase) {
      
        let event3=new CustomEvent("customEvent",{detail: {name:"valueCalculation", target: targ, trigger: "AcceptB"}})
        document.dispatchEvent(event3);
      }
    
    }

  }

  else if ($("#myModal").attr("funct")=="deleteRow"){

    let ID=$("#myModal").attr("rowid");
    
    $("#myModal").removeAttr("funct");
    
    let event4 = new CustomEvent("customEvent", {detail: {name: "deleteDbRow",ID: ID, trigger: "AcceptB"}})
    document.dispatchEvent(event4);


  }
}

function saveButtonClicked() {

  let values = {};
  
  var empty = false;

  //Check input fields and collect their data
  $('.inpRowElement').each(function() {
    

    //extract the data to values array
    if ($(this)[0].tagName == "TD"){

      let id=$(this)[0].id.split('-')[1]
      values[id]=$(this)[0].innerHTML;
    }

    else {
      console.log($(this)[0].value)
      //at input fields, check if they are empty
      if ($(this)[0].value == '') {

        $(this).attr("empty",true)
        //if any one of them is empty, change the bool to true
        empty = true;

      } 

      else {

        $(this).attr("empty",false)
        let id=$(this)[0].offsetParent.id.split('-')[1]
        values[id]=$(this)[0].value;
      
      }
    }
  });

  //if bool is true, not all the fields are filled ->can't save
  if (empty) {


    alert("at least one field is empty")

  } 

  if ($('#dateinput').val() > $('#dateinput').attr('max') || $('#dateinput').val() < $('#dateinput').attr('min')){

    alert("date is outside the valid date range")
  
  }

  //if everything is filled and dates are fine, we call the saveRow function
  else {
    
    let event1=new CustomEvent("customEvent",{detail: {name:"saveRow", values: values, trigger: "saveButton"}})
    document.dispatchEvent(event1);

  }   
}


export default function addAccountingEventListener(a) {


    var t=a || window.event;

    //-------------------- table clicked --------------------------------------

    $("#tbody").on("click",function(t) {

      var target = t.target || e.srcElement;
      //if field is not in the input row and is editable, open modal window
      if (target.id.split("-")[0]!="newRow" 
        && target.getAttribute("editable")=="true"){
        
        target.setAttribute("data-toggle","modal");
        target.setAttribute("data-target","#myModal");

        $(".modal-body").append(`<input id="input" type="text" class="form-control">`)

        $("#AcceptB").text("Save changes");
        $("#myModal").attr("funct","saveValue");
      
        $("#myModal").modal("show",{
          keyboard: true
        });


        if (target.id.split("-")[1]=="TRANS_DATE") {

          $("#input").attr("type","date");
          let date = new Date(target.getAttribute("timestamp"));
          $("#input")[0].value=date.toISOString().split("T")[0];

        }
        //any other field than date
        else {

          $("#input").attr("type","text");
          $("#input")[0].value=target.textContent;
        }

      }

    });


    //-------------- modal comes active ---------------------------------------

    $("#myModal").on("shown.bs.modal",function() {

      if ($("#myModal").attr("funct")=="saveValue") {

        $("#input")[0].focus();
      }

      else if ($("#myModal").attr("funct")=="deleteRow") {

        $("#AcceptB")[0].focus();
      }

    });

    //--------------- modal goes hidden ---------------------------------------

    $("#myModal").on("hide.bs.modal",function() {

      $(".modal-body").empty();

    });


    //-------------------- save button on modal clicked -----------------------

    $("#AcceptB").click(function(t) {
      console.log("USER: SAVE VALUE OR DELETE ROW")
      acceptBtnClicked()
    });

    //----------------------- user hits enter on modal ------------------------
    //prevent the default "close modal and refresh site" event
    //rather act like the Accept button

    $('.modal-content').keypress(function(e) {
      if(e.which == 13) {

      console.log("USER: SAVE VALUE OR DELETE ROW")
      event.preventDefault()
      
      acceptBtnClicked();

      $("#myModal").modal("hide");

      }

    });

    //--------------------- dismis button on modal clicked --------------------

    $(".dism").click(function() {

      if ($("#myModal").attr("funct")=="saveValue") {

        let targ=$("[data-target='#myModal']")[0];
        targ.removeAttribute("data-toggle");
        targ.removeAttribute("data-target");

      }

      else {

        $("#myModal").removeAttr("funct")
      }

    });

    //--------------------- Save row button clicked ---------------------------

    $("#saveButton").click(function() {
      
      console.log("USER: SAVE ROW")

      saveButtonClicked();


    });

    //--------------------- input loses focus ---------------------------------
    $(".inp").on("change", function(t) {
        console.log("USER: ENTER VALUE")
        let targ=t.originalEvent.target.offsetParent;

        let event=new CustomEvent("customEvent",{detail: {name:"valueCalculation", target: targ, trigger: "input field change"}})
        document.dispatchEvent(event);

        let event2=new CustomEvent("customEvent",{detail: {name:"checkLocalStorage", target: targ, trigger: "input field change"}})
        document.dispatchEvent(event2);

      });
    
  
};