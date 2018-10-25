import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, 
  tableRecordUpdate, displayXchData, displayHistXchData, valueCalculation, checkLocalStorage, addEventLis} from './tableHandler.js';

import apiCall from './apiCall.js';
import historicApiCall from './historicAPIcall.js';

//-------------------------------- DATA --------------------------------------------

//------------------------ initialize database ---------------------------
import MongoDb from './MongoDb.js'

//--------------- create an instance of the DataBase class --------------------

export var Mongo = new MongoDb();

// ------------------------ EVENT HANDLER ------------------------------------------
export function addAccountingEventHandler () {

document.addEventListener("customEvent", async function(event) {
  //console.log("accounting: ",event.detail)
  switch (event.detail.name) {

    case "buildTable":
      //------------ read data from database, then populate html table-----------
      var docs = await Mongo.getData()
  
      drawTable(docs)

      break;

    case "saveRow":

      //create JSON from the array recieved from the event listener
      //containing user defined values
      let obj = event.detail.values;
      //feed JSON with the insertContent function of the DataBase class
      var dbFill = await Mongo.insertData(obj);
      //reload the HTML table
      document.getElementById("container").innerHTML="";
      var event = new CustomEvent("pageEvent",{detail: {name:"reloadTable"}})
      document.dispatchEvent(event);
      
      break;

    case "recordUpdate":

      tableRecordUpdate(event.detail.target,event.detail.text);
      if (event.detail.target.id.split("-")[0]!="newRow"){
        let ID = event.detail.target.id.split("-")[0]
        let key = event.detail.target.id.split("-")[1]
        Mongo.updateData(ID, key, event.detail.text);
      }
      break;

    case "deleteDbRow":

      await Mongo.removeData(event.detail.ID)

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
