import dropDown from '../html/dropdown.js'
import CH from '../data/metaData.json';

//-------------------------- JQuery ------------------------------------------------
function acceptBtnClicked() {

  if ($("#myModal").attr("funct")=="saveValue") {

    let targ=$("[data-target='#myModal']")[0];      
    var text = $("#input").val();
    let variable=CH.columns[targ.id.split("-")[1]]
    var targText=""

    if (variable.name=="Date") {
      
        let date=targ.innerHTML.split("/")[2]+"-"+targ.innerHTML.split("/")[1]+"-"+targ.innerHTML.split("/")[0]
        targText=date
    }

    else {
      targText=targ.innerHTML
    }

    if(targText!=text) {
      
      //record update
      let event1 = new CustomEvent("customEvent", {detail: {name: "recordUpdate",target: targ, text: text, trigger: "AcceptB"}})
      document.dispatchEvent(event1);


      if (variable.name=="Date") {

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
      console.log("USER: SAVE VALUE")
      acceptBtnClicked()
    });

    //----------------------- user hits enter on modal ------------------------
    //prevent the default "close modal and refresh site" event
    //rather act like the Accept button

    $('.modal-content').keypress(function(e) {
      if(e.which == 13) {

      console.log("USER: SAVE VALUE")
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
      let values = {};
      
      var empty = false;

      //Check input fields and collect their data
      $('.inp').each(function() {
        
        if ($(this)[0].value == '') {

          $(this).attr("empty",true)
          //if any one of them is empty, change the bool to true
          empty = true;

        } 
        //extract the data to values array
        else {
          if ($(this)[0].tagName=="TD"){
            let id=$(this)[0].id.split('-')[1]
            values[id]=$(this)[0].innerHTML;
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

      //if everything is filled, we call the saveRow function
      else {
        
        let event1=new CustomEvent("customEvent",{detail: {name:"saveRow", values: values, trigger: "saveButton"}})
        document.dispatchEvent(event1);

        //then clean up: empty the input row        
        $('.inp').each(function() {
          //only calculated fields doesn't have inner input fields
          //therefore treated differently using innerHTML property
          //except for the currency field
          if ($(this)[0].tagName=="TD"  && $(this).attr("id")!="newRow-CURRENCY"){

            $(this)[0].innerHTML="";
          }
          else{

            if ($(this).attr("empty")) {
              $(this).removeAttr("empty")              
            }

            //also don't empty the date and dropdown fields
            if ($(this).attr("type")!="date") {

              $(this).val('')
            }

            else if ($(this).attr("type")=="date") {

              var date = new Date();

              $(this).val(date.toISOString().split("T")[0]);

            }
          }
          
            
        })

      let event2=new CustomEvent("customEvent",{detail: {name:"displayXchData", targ: document.getElementById("newRow-TRANS_DATE"), trigger: "saveButton"}})
      document.dispatchEvent(event2);

      }   

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