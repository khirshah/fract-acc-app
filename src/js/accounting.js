//-------------------------------- INIT ----------------------------------------------
import DataBase from './DataBase.js';
import modalContent from '../html/modal.js';
import {drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, calInpVal} from './tableHandler.js';
import eventListener from './eventListener.js';
import apiCall from './apiCall.js';



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

  var originalSetItem = localStorage.setItem; 

  localStorage.setItem = function() {

    var event = new Event('itemInserted');
    document.dispatchEvent(event);

    originalSetItem.apply(this, arguments);
    //console.log("Listening..",arguments[0])
    if (arguments[0]=="USDGBP") {
      displayXchData()
    }
  }

}


function displayXchData() {

      let USDGBP=window.localStorage.getItem("USDGBP")

      document.getElementById("newRow-XCH_USD_GBP").firstChild.value=USDGBP;
      document.getElementById("newRow-XCH_GBP_USD").firstChild.value=1/USDGBP;

}

function checkLocalStorage() {
    //let's compare the time difference in minutes between now and the recording
    // date of the data in the local sotrage 
    let now=new Date().getTime();
    let date= parseInt(window.localStorage.getItem("timestamp") || 0)
    let difference=(now-date)/1000/60
    console.log(parseInt(difference)+" minutes since the last API call")
    //if it's more than an hour, make another API call
    if ( difference > 0 || date == 0 ) {

      apiCall();
    }
    //if less, display the data currently in the local storage
    else {

      displayXchData();
    }

}


//-------------------- group callback functions --------------------





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
    addEventLis();
    checkLocalStorage();

    })


}







