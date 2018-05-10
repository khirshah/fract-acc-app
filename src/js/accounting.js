//-------------------------------- INIT ----------------------------------------------


import {insertTable, insertModal} from './tableHandler.js';

import {addAccountingEventHandler,dataB} from './accountingEventHandler.js'



//----------------------------- set event handlers ----------------------------


addAccountingEventHandler();

//------------------------------ main function ---------------------------
export default function runAccounting() {


  //------------------------ insert html table -------------------------------
  
  let event1 = new CustomEvent("customEvent",{detail: {name:"insertTable"}})
  document.dispatchEvent(event1);
  //------------------------- insert modal from file --------------------------
    

  let event2 = new CustomEvent("customEvent",{detail: {name:"insertModal"}})
  document.dispatchEvent(event2);

  //------------------------ build html table --------------------------------- 

  let event3 = new CustomEvent("customEvent",{detail: {name:"buildTable"}})
  document.dispatchEvent(event3);

};







