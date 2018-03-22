//-------------------------- JQuery -------------------------------------------------
import populateTable from './tableHandler.js';

export default function eventListener(a, callbacks) {
  return function(a){

    var t=a || window.event;

    
    $("#table").on("click",function(t) {

      var target = t.target || e.srcElement;
      
      if (target.tagName=="DIV"){
      target.setAttribute("data-toggle","modal");
      target.setAttribute("data-target","#myModal");
      
      $("#myModal").modal("show",{
        keyboard: true
      });
      
      $("#input")[0].value=target.textContent;
      }
    });


    $("#myModal").on("shown.bs.modal",function() {

      $("#input")[0].focus();
    });

    
    $("#saveB").click(function() {

      let targ=$("[data-target='#myModal']")[0];
     
      let text = $("#input").val();

      let rUpdate=callbacks.rUpdate;
      rUpdate(targ,text);

    });

    //if user hits enter, prevent default close modal and refresh site event
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


    $("#dismisB").click(function() {
      
      let targ=$("[data-target='#myModal']")[0];
      targ.removeAttribute("data-toggle");
      targ.removeAttribute("data-target");

    });


    $("#plusButton").click(function() {
      let values=[];
      var empty = false;
      $('textarea').each(function() {

        if ($(this).val() == '') {
            empty = true;
        } else {
            values.push($(this).val());
          }
        
        });

        if (empty) {
            alert("at least one field is empty")
        } else {
            console.log("all are filled",values)
            
            let updateTable = callbacks.updateTable;

            updateTable(values);


        }    

    });



  }
};