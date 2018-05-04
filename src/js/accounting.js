//-------------------------------- INIT ----------------------------------------------
import DataBase from './DataBase.js';

import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, displayXchData, calInpVal} from './tableHandler.js';
import eventListener from './eventListener.js';
import apiCall from './apiCall.js';
import {addDispachedEventListener,dataB} from './dispachedEventListener.js'

//import dataB from './dispachedEventListener.js'

var refreshInterval=120;




//-------------------------------- FUNCTIONS ----------------------------------

//--------------------- build up the html base ---------------------------


//---------------------- place event listeners ---------------------------
function addEventLis() {

  var callBackFunctions = {};
  callBackFunctions.checkLocalStorage=checkLocalStorage;
  callBackFunctions.saveRow = saveRow;


  $(document).ready(eventListener(jQuery, callBackFunctions ));

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







