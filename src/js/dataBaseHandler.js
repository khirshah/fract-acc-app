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

//-------------------------- JQuery -------------------------------------------------

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