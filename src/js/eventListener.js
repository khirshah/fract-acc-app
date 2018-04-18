import dropDown from './dropdown.js'

//-------------------------- JQuery -------------------------------------------------

export default function eventListener(a, callbacks) {
  return function(a){

    var t=a || window.event;

    //-------------------- table clicked ---------------------------------------

    $("#table").on("click",function(t) {

      var target = t.target || e.srcElement;
      //if field is not in the input row and is editable, open modal window
      if (target.id.split("-")[0]!="newRow" && target.getAttribute("editable")=="true"){
        
        target.setAttribute("data-toggle","modal");
        target.setAttribute("data-target","#myModal");
      
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


    //-------------- modal comes active -----------------------------------------

    $("#myModal").on("shown.bs.modal",function() {

      $("#input")[0].focus();
    });


    //-------------------- save button on modal clicked -------------------------

    $("#saveB").click(function() {
      let targ=$("[data-target='#myModal']")[0];      
      
      if (targ.id.split("-")[1]!="DATE") {

        var text = $("#input").val();
      }
      else {
        var text = $("#input").val();
        console.log("saveB: "+text)
      }

      let rUpdate=callbacks.rUpdate;
      rUpdate(targ,text);

    });

    //----------------------- user hits enter on modal -------------------------
    //prevent the default "close modal and refresh site" event
    //rather act like the Save button

    $('.modal-content').keypress(function(e) {
      if(e.which == 13) {

      event.preventDefault()
      
      let targ=$("[data-target='#myModal']")[0];
     
      let text = $("#input").val();

      let rUpdate=callbacks.rUpdate;
      rUpdate(targ,text);

      $("#myModal").modal("hide");
      }
    });

    //--------------------- dismis button on modal clicked ---------------------

    $("#dismisB").click(function() {
      
      let targ=$("[data-target='#myModal']")[0];
      targ.removeAttribute("data-toggle");
      targ.removeAttribute("data-target");

    });

    //--------------------- Save row button clicked ----------------------------

    $("#saveButton").click(function() {
      
      let values={};
      var empty = false;

      //Check input fields and collect their data
      $('.inp').each(function() {

        if ($(this)[0].value == '') {
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

          let id=$(this)[0].offsetParent.id.split('-')[1]
          values[id]=$(this)[0].value;
          }

        }

      });


      //if bool is true, not all the fields are filled ->can't save
      if (empty) {

        alert("at least one field is empty")

      } 

      //if everíthing is filled, we call the saveRow function
      else {

        let saveRow = callbacks.saveRow;
        saveRow(values);

        //then clean up: empty the input row        
        $('.inp').each(function() {
          //only calculated fields doesn't have inner input fields
          //therefore treted differently using innerHTML property
          if ($(this)[0].tagName=="TD"){
            console.log($(this)[0].innerHTML)
            $(this)[0].innerHTML="";
          }
          else{
            //also don't empty the date and dropdown fields
            if ($(this).attr("type")!="date") {

              $(this).val('')
            }
          }
          
            
        })


      }   

    });

    $(".delbtn").on("click", function(t) {

      var target = t.target || e.srcElement;
      let ID=target.offsetParent.id.split("-")[0]

      let delDbRow = callbacks.delDbRow
      delDbRow(ID)
    })



  }
};