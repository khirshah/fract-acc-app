import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, displayXchData, calInpVal} from './tableHandler.js';

import DataBase from './DataBase.js';

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
export function addDispachedEventListener () {

document.addEventListener("customEvent", function(event) {
  console.log(event.detail)
  switch (event.detail.name) {

    case "itemInserted":
      
      displayXchData();
      break;

    case "recordUpdate":
      updateTableCell(event.detail.target,event.detail.text);
      break;

    case "valueCalculation":
      
      calInpVal(event.detail.target);
      break;

    case "dbValueUpdate":

      let ID = event.detail.target.id.split("-")[0]
      let key = event.detail.target.id.split("-")[1]
      dataB.updateDbRec(ID, key, event.detail.text);
      break;

    case "deleteDbRow":

      dataB.deleteRow(event.detail.ID)
      //let parent=document.getElementById(tbody)
      let row=document.getElementById(event.detail.ID)
      tbody.removeChild(row);
      break;

  }

})
}
