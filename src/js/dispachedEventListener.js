import {insertTable, insertModal, drawTable, addInputRow, insertTableRow, createDStruct, 
  updateTableCell, displayXchData, calInpVal} from './tableHandler.js';


export default function addDispachedEventListener () {

document.addEventListener("customEvent", function(event) {
  console.log(event.detail.name)
  switch (event.detail.name) {

    case "itemInserted":
      
      displayXchData();
      break;

    case "cellUpdated":
      updateTableCell();
      break;

    case "valueCalcNeeded":
      
      calInpVal(event.detail.target);
      break;

    /*case "dbValUpdateNeeded":
        let ID = event.detail.target.split("-")[0]
        let key = event.detail.target.split("-")[1]
        dataB.updateDbRec(ID, key, event.detail.text);*/

  }

})
}
