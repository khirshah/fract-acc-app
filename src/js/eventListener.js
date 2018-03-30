//-------------------------- JQuery -------------------------------------------------

export default function eventListener(a, callbacks) {
  return function(a){

    var t=a || window.event;

    //-------------------- table clicked ---------------------------------------

    $("#table").on("click",function(t) {

      var target = t.target || e.srcElement;

      if (target.tagName=="DIV" && target.id.split("-")[1]!="ID"){
        
        target.setAttribute("data-toggle","modal");
        target.setAttribute("data-target","#myModal");
      
        $("#myModal").modal("show",{
          keyboard: true
        });

        if (target.id.split("-")[1]=="DATE") {

          $("#input").attr("type","date");
          let date = new Date(target.getAttribute("timestamp"));
          $("#input")[0].value=date.toISOString().split("T")[0];
        
        }

        else{
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

    $("#plusButton").click(function() {
      
      let values={};
      var empty = false;

      //Check textareas and collect their data
      $('input').each(function() {

        if ($(this).val() == '' && $(this).inneHTML == '') {
            //if any one of them is empty, change the bool to true
            empty = true;
            console.log($(this))
        } 

        else {

          let id=$(this).attr('id').split('-')[1]
          values[id]=$(this).val();
        
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

          //then clean up: increase row ID of input row and empty the textareas
          table.lastChild.firstChild.innerHTML=parseInt(table.lastChild.firstChild.innerHTML)+1;
          
          $('input').each(function() {
            if ($(this).attr("type")!="date")
              $(this).val('')
          })


        }    

    });



  }
};