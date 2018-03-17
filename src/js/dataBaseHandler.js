//-------------------------------- init ----------------------------------------------

import DataBase from './dataBase.js';
import RecordUpdate from './eventHandler.js';
import modalContent from './modal.js';


//-------------------------------- data -----------------------------------------------


var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

var dataB = new DataBase(db);


//import Data from './data.json';
//dataB.clearDb();
//dataB.add(Data);

//-------------------------------- functions -----------------------------------------


function createTable(){

  var table=document.getElementById('table');
  table.setAttribute("contenteditable", "true");

  var m=modalContent();
  document.getElementById("container").innerHTML+=m;

};

/*function addEvLis(){

  table.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    //target.setAttribute("id","active");
    target.setAttribute("data-toggle","modal");
    target.setAttribute("data-target","#myModal");

    //buildModal();

    //var upd = new RecordUpdate(db,target);
    //upd.main();
  }, false);

};

function buildModal(){



    ///$("#myModal").modal("show");
    return 0;

};*/

/*$('#myModal').on('shown.bs.modal', function (e) {
  // do something...
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  console.log(modal);
})*/

$(document).ready(function(a){

  var t=a || window.event;
  
  $("#table").click(function(t){
    var target = t.target || e.srcElement;
    target.setAttribute("data-toggle","modal");
    target.setAttribute("data-target","#myModal");
    
    $("#myModal").modal("show");
    console.log($("#input")[0]);
    $("#input")[0].value=target.textContent;
  });

  $("#saveB").click(function(){
   
    let text = $("#input").val();

    let targ=$("[data-target='#myModal']")[0];

    var upd = new RecordUpdate(db,targ);
    upd.main(text);

  });

  $("#dismisB").click(function(){
    console.log("CLOSE");
    let targ=$("[data-target='#myModal']")[0];
    targ.removeAttribute("data-toggle");
    targ.removeAttribute("data-target");
  });
});


//-------------------------- commands ----------------------------------------------

createTable();

dataB.findData();

//addEvLis();