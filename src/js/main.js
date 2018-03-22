//-------------------------------- init ----------------------------------------------

import DataBase from './DataBase.js';
import modalContent from './modal.js';
import populateTable from './tableHandler.js';
import eventListener from './eventListener.js';
import RecordUpdate from './RecordUpdate.js';


//-------------------------------- data -----------------------------------------------


var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

var dataB = new DataBase(db);


//import Data from './data.json';
//dataB.clearDb();
//dataB.populateDb(Data);

//-------------------------------- functions -----------------------------------------

function createModal(){

  var m=modalContent();
  document.getElementById("container").innerHTML+=m;

};


function updateTable(values) {
  
  dataB.createDStruct(values);
  //populateTable.insertTableRow();

};


function rUpdate(targ, text){
  console.log(targ, text)
    var upd = new RecordUpdate(db,targ, text);
    upd.main();
};


var callBackFunctions = {}
callBackFunctions.rUpdate = rUpdate
callBackFunctions.updateTable = updateTable

$(document).ready(eventListener(jQuery, callBackFunctions ));

//-------------------------- commands ----------------------------------------------

createModal();  //appending data from external file

dataB.fetchData(populateTable);  //reading data from database, then populating html table

//document.getElementById("plusButton").setAttribute("disabled",true);
