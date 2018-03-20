//-------------------------- JQuery -------------------------------------------------
import populateTable from './tableHandler.js';

export default function eventListener(a, q) {
  return function(a){

    var t=a || window.event;

    
    $("#table").on("click",function(t) {

      var target = t.target || e.srcElement;
      console.log(target);
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

      let rUpdate=q
      rUpdate(targ,text);

    });


    $('.modal-content').keypress(function(e) {
      if(e.which == 13) {
      //dosomething
      event.preventDefault()
      
      let targ=$("[data-target='#myModal']")[0];
     
      let text = $("#input").val();

      let rUpdate=q
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
      
      var empty = false;
      $('textarea').each(function() {
        if ($(this).val() == '') {
            empty = true;
            }
        });

        if (empty) {
            alert("at least one field is empty")
        } else {
            console.log("all are filled")
            populateTable.addRow();
        }    

    });



  }
};