//-------------------------------- INIT ----------------------------------------------
import DataBase from './DataBase.js';

import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, displayXchData, calInpVal, checkLocalStorage} from './tableHandler.js';
import addAccountingEventListener from './accountingEventListener.js';
//import apiCall from './apiCall.js';
import {addAccountingEventHandler,dataB} from './accountingEventHandler.js'

//import dataB from './dispachedEventListener.js'




//-------------------------------- FUNCTIONS ----------------------------------


//---------------------- place event listeners ---------------------------
function addEventLis() {

  $(document).ready(addAccountingEventListener());

};

addAccountingEventHandler();

//------------------------------ main function ---------------------------
export default function runAccounting() {


  //------------------------ insert html table -----------------------------
  insertTable();
  //------------------------- insert modal from file ------------------------
  insertModal();  

  let event = new CustomEvent("customEvent",{detail: {name:"buildTable"}})
  document.dispatchEvent(event);


  //------------ read data from database, then populate html table-----------


};







