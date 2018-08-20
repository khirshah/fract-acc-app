import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  tableRecordUpdate, displayXchData, displayHistXchData, valueCalculation, checkLocalStorage, addEventLis} from './tableHandler.js';

import DataBase from './DataBase.js';
import apiCall from './apiCall.js';
import historicApiCall from './historicAPIcall.js';

//-------------------------------- DATA --------------------------------------------

//------------------------ initialize database ---------------------------
import MongoDb from './MongoDb.js'

export var Mongo = new MongoDb();


var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });


//--------------- create an instance of the DataBase class --------------------

export var dataB = new DataBase(db);

//reset database original values from JSON
//import Data from '../data/data.json';
//dataB.clearDb();
//dataB.insertContent(Data);


// ------------------------ EVENT HANDLER ------------------------------------------
export function addAccountingEventHandler () {

document.addEventListener("customEvent", async function(event) {
  console.log("accounting: ",event.detail)
  switch (event.detail.name) {

    case "buildTable":
      //------------ read data from database, then populate html table-----------
      var docs = await Mongo.getData()
  
      drawTable(docs)

      break;

    case "saveRow":

      //create JSON from the array recieved from the event listener
      //containing user defined values
      let obj = createDStruct(event.detail.values);
      //feed JSON with the insertContent function of the DataBase class
      var dbFill = await Mongo.insertData(obj);
      //dbFill variable ensures the program waits before the insertion is done
      obj._id=dbFill
      //console.log("dbFill: ", dbFill)
      //var doc = await Mongo.getDataLine(obj.ID);
      //console.log(doc)
      insertTableRow(obj)
      
      break;

    case "recordUpdate":

      tableRecordUpdate(event.detail.target,event.detail.text);
      if (event.detail.target.id.split("-")[0]!="newRow"){
        let ID = event.detail.target.id.split("-")[0]
        let key = event.detail.target.id.split("-")[1]
        dataB.updateDbRec(ID, key, event.detail.text);
      }
      break;

    case "deleteDbRow":

      dataB.deleteRow(event.detail.ID)

      let row=document.getElementById(event.detail.ID)
      tbody.removeChild(row);
      break;

    case "historicApiCall":

      historicApiCall(event.detail.date,event.detail.targ);
      break;

    case "displayXchData":
      
      displayXchData(event.detail.targ, event.detail.trigger);
      break;

    case "valueCalculation":
      
      valueCalculation(event.detail.target);
      break;

    case "checkLocalStorage":

      checkLocalStorage();
      break;

    case "apiCall":

      apiCall();
      break;

    case  "addInputRow":

      addInputRow();
      break;

    case "addEventLis":
      
      addEventLis();
      break;

    case "checkLocalStorage":

      checkLocalStorage();
      break;

    case "insertModal":

      insertModal();
      break;

    case "insertTable":

      insertTable();
      break;

  }

})
}
