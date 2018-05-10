import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  tableRecordUpdate, displayXchData, valueCalculation, checkLocalStorage, addEventLis} from './tableHandler.js';

import DataBase from './DataBase.js';
import apiCall from './apiCall.js';

//-------------------------------- DATA --------------------------------------------

//------------------------ initialize database ---------------------------

var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

//--------------- create an instance of the DataBase class --------------------

export var dataB = new DataBase(db);

//reset database original values from JSON
//import Data from '../data/data.json';
//dataB.clearDb();
//dataB.insertContent(Data);

//console.log(dataB)

// ------------------------ EVENT HANDLER ------------------------------------------
export function addAccountingEventHandler () {

document.addEventListener("customEvent", function(event) {
  console.log("accounting: ",event.detail)
  switch (event.detail.name) {

    case "displayXchData":
      
      displayXchData();
      break;

    case "tableRecordUpdate":
      tableRecordUpdate(event.detail.target,event.detail.text);
      break;

    case "valueCalculation":
      
      valueCalculation(event.detail.target);
      break;

    case "dbValueUpdate":

      let ID = event.detail.target.id.split("-")[0]
      let key = event.detail.target.id.split("-")[1]
      dataB.updateDbRec(ID, key, event.detail.text);
      break;

    case "deleteDbRow":

      dataB.deleteRow(event.detail.ID)

      let row=document.getElementById(event.detail.ID)
      tbody.removeChild(row);
      break;

    case "saveRow":

      //create JSON from the array recieved from the event listener
      //containing user defined values
      let obj = createDStruct(event.detail.values);
      //feed JSON with the insertContent function of the DataBase class
      let dbFill = dataB.insertContent(obj);
      //dbFill variable ensures the program waits before the insertion is done
      dataB.findData(insertTableRow,obj.ID);
      break;

    case "checkLocalStorage":

      checkLocalStorage();
      break;

    case "apiCall":

      apiCall();
      break;

    case "buildTable":
    //------------ read data from database, then populate html table-----------
      var promise=dataB.fetchData();

      promise.exec(function(error,docs) {

        drawTable(docs);
        addInputRow();
        addEventLis();

        checkLocalStorage();


        })
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
