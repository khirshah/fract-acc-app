//-------------------------------- INIT ----------------------------------------------
import DataBase from './DataBase.js';

import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, displayXchData, calInpVal} from './tableHandler.js';
import eventListener from './eventListener.js';
import apiCall from './apiCall.js';
import addDispachedEventListener from './dispachedEventListener.js'

var refreshInterval=120;

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


//-------------------------------- FUNCTIONS ----------------------------------

//--------------------- build up the html base ---------------------------


//---------------------- place event listeners ---------------------------
function addEventLis() {

  var callBackFunctions = {};
  callBackFunctions.checkLocalStorage=checkLocalStorage;
  callBackFunctions.rUpdate = rUpdate;
  callBackFunctions.saveRow = saveRow;
  callBackFunctions.delDbRow = delDbRow;
  callBackFunctions.calInpVal=calInpVal;

  $(document).ready(eventListener(jQuery, callBackFunctions ));

  /*var originalSetItem = localStorage.setItem; 

  localStorage.setItem = function() {



    originalSetItem.apply(this, arguments);

    if (arguments[0]=="USDGBP") {

      displayXchData();
    }
  }*/



};

//-------------------- get exchange data ---------------------------------
function checkLocalStorage() {
    //let's compare the time difference in minutes between now and the recording
    // date of the data in the local sotrage 
    let now=new Date().getTime();
    let date= parseInt(window.localStorage.getItem("timestamp") || 0);
    let difference=(now-date)/1000/60;
    console.log(parseInt(difference)+" minutes since the last API call");
    //if it's more than an hour, make another API call
    if ( difference > refreshInterval || date == 0 ) {

      apiCall();
    }
    //if less, display the data currently in the local storage
    else {

      displayXchData();
    }

};

//-------------------- display exchange data -----------------------------


//---------------------- callbacks of event listeners --------------------
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

};


//------------------------------ main function ---------------------------
export default function runAccounting() {


  //------------------------ insert html table -----------------------------
  insertTable();
  //------------------------- insert modal from file ------------------------
  insertModal();  


  //------------ read data from database, then populate html table-----------

  var promise=dataB.fetchData();

  promise.exec(function(error,docs) {

    drawTable(docs);
    addInputRow();
    //displayXchData();
    //console.log("addDispachedEventListener done")
    addEventLis();
    addDispachedEventListener();
    checkLocalStorage();


    })

};







