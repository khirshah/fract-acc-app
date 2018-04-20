//-------------------------------- INIT ----------------------------------------------
import DataBase from './DataBase.js';
import modalContent from '../html/modal.js';
import {drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, calInpVal} from './tableHandler.js';
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

function delDbRow(ID){

  dataB.deleteRow(ID)
  let parent=document.getElementById(tbody)
  let row=document.getElementById(ID)
  tbody.removeChild(row);
}

function addEventLis() {

  var callBackFunctions = {}
  callBackFunctions.rUpdate = rUpdate
  callBackFunctions.saveRow = saveRow
  callBackFunctions.delDbRow = delDbRow
  callBackFunctions.calInpVal=calInpVal

  $(document).ready(eventListener(jQuery, callBackFunctions ));
}


//-------------------- group callback functions --------------------





export default function runAccounting() {

  var callBs = {}
  callBs.drawTable=drawTable
  callBs.addInputRow=addInputRow
  callBs.addEventLis=addEventLis

  //------------------------ insert html table -----------------------------
  insertTable();
  //------------------------- insert modal from file ------------------------
  insertModal();  


  //------------ read data from database, then populate html table-----------

  var dbcall= dataB.fetchData(callBs);


}







