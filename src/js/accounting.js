//-------------------------------- INIT ----------------------------------------------
import DataBase from './DataBase.js';
import modalContent from './modal.js';
import {drawTable, addRow, insertTableRow, createDStruct, 
  updateTableCell} from './tableHandler.js';
import eventListener from './eventListener.js';


//-------------------------------- DATA -----------------------------------------------

//------------------------ initialize database ---------------------------

var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

//--------------- create an instance of the DataBase class ---------------

var dataB = new DataBase(db);

//reset database original values from JSON
//import Data from '../data/data.json';
//dataB.clearDb();
//dataB.insertContent(Data);


//-------------------------------- FUNCTIONS -----------------------------------------

function insertTable() {

  var table=document.createElement('table')
  table.classList.add("table")
  table.setAttribute('id','table')
  document.getElementById("container").appendChild(table)
}

function insertModal() {

  var m=modalContent();
  document.getElementById("container").innerHTML+=m;

};


function saveRow(values) {
  //create JSON from the array recieved from the event listener
  //containing user defined values
  let obj = createDStruct(values);
  //feed JSON with the insertContent function of the DataBase class
  let dbFill = dataB.insertContent(obj);
  //dbFill variable ensures the program waits before the insertion is done
  dataB.findData(insertTableRow,obj.ID);

};


function rUpdate(targ, text){
  //get key and id from target html object's id
  let ID=targ.id.split("-");
  //overwrite corresponding data in database
  dataB.updateDbRec(ID[0], ID[1], text);
  //and also in the html
  updateTableCell(targ,text);

};


//-------------------- group callback functions --------------------

var callBackFunctions = {}
callBackFunctions.rUpdate = rUpdate
callBackFunctions.saveRow = saveRow

var callBs = {}
callBs.drawTable=drawTable
callBs.addRow=addRow

export default function runAccounting(){

  //------------------------ insert html table -----------------------------
  insertTable();
  //------------------------- insert modal from file ------------------------
  insertModal();  

  //------------------------- set up eventlisteners -------------------------

  $(document).ready(eventListener(jQuery, callBackFunctions ));


  //------------ read data from database, then populate html table-----------

  dataB.fetchData(callBs);

}







