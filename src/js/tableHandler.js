//----------------------------------------- INIT ------------------------------

import metaD from '../data/metaData.json';
import dropDown from '../html/dropdown.js';
import jsonLogic from "json-logic-js";
import modalContent from '../html/modal.js';
import addAccountingEventListener from './accountingEventListener.js';

var metaDArray = Object.keys(metaD.columns.USD);

var refreshInterval = 60;

//----------------------------------------- FUNCTIONS -------------------------

//------------------------------ zeropad -----------------------------
function zPad(n) {return n < 10 ? "0"+n : n;}

//---------------------- table initializer functions -----------------

export function insertTable() {
  //create html table
  var table = document.createElement('table');
  //define its class as table
  table.classList.add("table");
  //let it's id be table as well
  table.setAttribute('id','table');
  //attach it to the container
  document.getElementById("container").appendChild(table);

}

export function insertModal() {
  //let the imported modal content to be m
  var m = modalContent();
  //attach it to the container
  document.getElementById("container").innerHTML += m;

};

function createTableHeader() {
  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]
  //create the table header
  var tableHeader = document.createElement('thead');
  //set it's class to be thead
  tableHeader.setAttribute("class","thead");  

  //create a row inside the head
  var headerRow = document.createElement('tr');
  //set it's class to row
  headerRow.classList.add('row');
 
  //iterate through the metaDataArray
  //so objects are taken in a certain order
  for (var j in metaDArray) {
    //save the current variable for further use
    let variable = metaData[metaDArray[j]];
    //if our current variable appears in the html table 
    //according to the metadata
    if (variable.visible) {
      //create a table cell in our tableheader row
      var col = document.createElement('td');
      //let it's scope be the column
      col.setAttribute("scope","col");
      //and it's class col-sm - bootstap flexible col width
      col.classList.add('col-'+variable.size);
      //write the name of the variable to the header        
      col.innerHTML = variable.name;
      //finally attach it to our thead row
      headerRow.appendChild(col); 
    };

  };
  //to make the table look nice we add the extra column for the
  //delete button, but no button here
  headerRow.innerHTML += '<td class="col-1"></td>';
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);
};

export function drawTable(content) {

  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]

  //first create table header with the function above
  createTableHeader();
  //then the body
  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  tableBody.setAttribute("class","tbody");
  tableBody.setAttribute("id","tbody");

  //iterate through the content rows
  for (var i in content) {
   
    //and create rows of the html table accordingly
    var r = document.createElement('tr');
    r.classList.add('row');
    r.setAttribute("id", content[i]._id);

    for (var j in metaDArray) {
      //save the current variable for further use
      let variable=metaData[metaDArray[j]];

      //same with the columns if they are visible
      if (variable.visible) {

        var col = document.createElement('td');
        col.setAttribute("id", content[i]._id+"-"+metaDArray[j]);
        col.classList.add('col-'+variable.size);
        col.setAttribute("editable",variable.editable);

        //then we copy the data from the database to the html
        if (metaDArray[j] == "TRANS_DATE") {
          //we convert the format to browser locale value
          let date = new Date(content[i][metaDArray[j]]);
          //and save the actual timestamp as an attribute of this field
          col.setAttribute("timestamp",date);
          col.innerHTML = date.toISOString().split("T")[0];
        }

        else if (metaDArray[j]=="PROJ") {
          //in case of projection set the number of digits to 2    
          col.innerHTML = parseFloat(content[i][metaDArray[j]]).toFixed(2);
        }

        else if (metaDArray[j]=="GBP_USD" || metaDArray[j]=="USD_GBP") {
          //in case of xch rates set the number of digits to 10    
          col.innerHTML = parseFloat(content[i][metaDArray[j]]).toFixed(10);
        }

        else {
          col.innerHTML = content[i][metaDArray[j]];
        }
        //at the end we insert the current cell to the row
        r.appendChild(col);

      };

    };

    let cellid = content[i]._id+"-"+"delbtn";
    let btn = createDelBtns(cellid); 
    r.innerHTML += btn;

    //when a row is filled, we insert that row to the table
    tableBody.appendChild(r);
    delBtnEvLis(cellid);

  };

  let event=new CustomEvent("customEvent",{detail: {name:"addInputRow", trigger: "drawTable"}})
  document.dispatchEvent(event);

};

function createDelBtns(id){

  return `<td id="`+id+ `" class = "col-1"><button id=`+id+`0`+` class="btn delbtn">-</button></td>`;

}

function delBtnEvLis(id) {

  //--------------------- Delete row button clicked -------------------------
  $("#"+id+"0").on("click", function(t) {

    t = t || window.event;
    var target = t.target || e.srcElement;

    let ID=target.id.split("-")[0];

    $("#myModal").attr("rowId",ID);

    $(".modal-body").append(`<p>Are you sure?</p>`);

    $("#AcceptB").text("Delete row");
    $("#myModal").attr("funct","deleteRow");

    $("#myModal").modal("show",{
      keyboard: true

    });

  });

};


export function  addInputRow() {
  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]
  
  var row = document.createElement("tr")
  row.setAttribute("class","row")
  row.id="newRow"

  for (var j in metaDArray) {

    var variable = metaData[metaDArray[j]];

    if (variable.visible) {
        //create divs
      var col = document.createElement('td');
      col.classList.add('col-'+ variable.size);
      col.setAttribute("id",'newRow-'+ metaDArray[j]);
      col.setAttribute("editable",variable.editable);
      col.setAttribute("dataType",variable.dataType);

      switch (variable.inputType) {
        
        case "USER_INPUT":
          //console.log(variable.name)
          var inp = document.createElement('input');
          inp.setAttribute("placeholder",'edit');
          inp.classList.add('inp');
          inp.classList.add('inpRowElement');

          col.appendChild(inp);
          break;

        case "DROPDOWN":
          let curr = document.getElementById("accounting").getAttribute("currencyname")
          let currs = Object.keys(metaD.columns)
          var dd = dropDown();
          col.innerHTML += dd;
          dd = col.firstChild;
          for (var i in currs) {
            if (currs[i] != curr) {
              
              dd.options[dd.options.length] = new Option("XC to "+currs[i]);
            }
          }


          break;

        case "DATEINPUT":
          var dt = document.createElement('input');
          dt.setAttribute("type","date");
          dt.classList.add("inp");
          dt.classList.add('inpRowElement');
          dt.classList.add("date");
          dt.setAttribute("id","dateinput");

          //we create a new date
          var date= new Date();

          dt.value = date.toISOString().split("T")[0];
          dt.max = date.toISOString().split("T")[0];
          dt.min = '2015-01-01'
          col.appendChild(dt);
          break;

        case "ASSIGNED" :
          
          if (variable.name == "Currency") {
          
            col.innerHTML+=document.getElementById('accounting').getAttribute('Currency');
          
          }
          col.classList.add('inpRowElement');
          break;

        default:

          col.classList.add('inpRowElement');
          break;

      }; 

      row.appendChild(col);

    };


  };

  // put the save button at the end of this row
  row.innerHTML+='<td id="newRow-button" class="col-1"><button id="saveButton" class="btn">+</button></td>';

  //upon completion append row to table
  document.getElementById("tbody").appendChild(row);
  document.getElementById("dateinput").value=date.toISOString().split("T")[0];
  
  let event=new CustomEvent("customEvent",{detail: {name:"addEventLis", trigger: "addInputRow"}})
  document.dispatchEvent(event);

};


//---------------------- place event listeners ---------------------------
export function addEventLis() {
  
  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]
  
  $(document).ready(addAccountingEventListener(jQuery));
      
  let event = new CustomEvent("customEvent",{detail: {name:"checkLocalStorage", trigger: "addEventLis"}})
  document.dispatchEvent(event);


};

//------------------------- table update functions ----------------------------

//-------------------- get exchange data ---------------------------------
export function checkLocalStorage() {
  
  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]  

  //see what date we have in the date field
  //if today's
  let dateFieldValue = document.getElementById("dateinput").value;
  //let's compare the time difference in minutes between now and the recording
  // date of the data in the local sotrage 
  let now = new Date();
  let nowtime = now.getTime();
  let nowdate = now.toISOString().split("T")[0]

  if (nowdate == dateFieldValue) {

    let date = parseInt(window.localStorage.getItem("timestamp") || 0);
    let difference = (nowtime-date)/1000/60;
    console.log(parseInt(difference)+" minutes since the last API call");
    //if it's more than an hour, make another API call
    if ( difference > refreshInterval || date == 0 ) {

      let event = new CustomEvent("customEvent",{detail: {name:"apiCall", trigger: "checkLocalStorage"}})
      document.dispatchEvent(event);

    }
    //if less, display the data currently in the local storage
    else {
      //but only if the values already in the table don't match the values already displayed
      let tableValue = document.getElementById("newRow-XCH_USD_GBP").firstChild.value;
      let storageValue = localStorage.getItem("USDGBP");
      
      if (tableValue!=storageValue) {
        let event=new CustomEvent("customEvent",{detail: {name:"displayXchData", targ: document.getElementById("newRow-TRANS_DATE"), trigger: "checkLocalStorage"}})
        document.dispatchEvent(event);
      }

    };

  }

  else {

    let event=new CustomEvent("customEvent",{detail: {name:"historicApiCall", targ: document.getElementById("newRow-TRANS_DATE"), date: dateFieldValue, trigger: "checkLocalStorage"}})
    document.dispatchEvent(event);     
  
  };

};
//------------------- display exchange data ------------------------------
export function displayXchData(target, trigger) {

  console.log("dispXCHtarg",target)

  let curr = document.getElementById('accounting').getAttribute('CurrencyName');
  var metaData = metaD.columns[curr];

  let variable = metaData[target.id.split("-")[1]];
  var ID = target.id.split("-")[0];

  if (trigger == "historicAPIcall") {
      var USDGBP = window.localStorage.getItem("hist_USDGBP");

  }

  else {

      var USDGBP = window.localStorage.getItem("USDGBP");
  }

  document.getElementById(ID+"-XCH_USD_GBP").firstChild.value = parseFloat(USDGBP).toFixed(10);
  document.getElementById(ID+"-XCH_GBP_USD").firstChild.value = (1/USDGBP).toFixed(10);

  if (variable.calcBase) {

    let event3 = new CustomEvent("customEvent",{detail: {name:"valueCalculation", target: document.getElementById(ID+"-XCH_USD_GBP"), trigger: "displayXchData"}});
    document.dispatchEvent(event3);
  };

};


export function tableRecordUpdate(target,text) {

  if (target.hasAttribute("data-toggle")) {
  
    target.removeAttribute("data-toggle");
    target.removeAttribute("data-target");
  };

  target.classList.contains("inp") ? target.value = text : target.innerHTML = text;

  if (target.id.split("-")[1]=="TRANS_DATE"){

    let date = new Date(text);
    //save the timestamp as an attribute of the date field
    target.setAttribute("timestamp",date);

  }

};


 //----------- calculate input field value -------------------------------------

export function valueCalculation(target) {

  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]

  let rowID = target.id.split("-")[0];
  let variable = target.id.split("-")[1]
  
  
  switch (target.id.split("-")[1]) {

    case "AMOUNT":

      calcProj(target);

      break;

    case "XCH_USD_GBP": case "XCH_GBP_USD":

      let value = target.firstChild.value || target.innerText;
      
      if (value != "") {

        let text = 1/target.firstChild.value || 1/target.innerHTML;

        let targ = document.getElementById(rowID+"-"+metaData[variable].calculation[2]).firstElementChild || document.getElementById(rowID+"-"+metaData[variable].calculation[2])
        
        console.log("valueCalcTARG",targ)
        let event1 = new CustomEvent("customEvent", {detail: {name: "recordUpdate",target: targ, text: text, trigger: "valueCalculation"}})
        document.dispatchEvent(event1);

        calcProj(target);

      }

      break;

    default:
      break;
  }

};

function calcProj(target) {
  
  let curr = document.getElementById('accounting').getAttribute('CurrencyName')
  var metaData = metaD.columns[curr]

  let c = metaData.PROJ.calculation
  let rowID = target.id.split("-")[0]
  
  //get the Amount field of the given row
  let AMOUNT = document.getElementById(rowID+"-"+c[1]).firstChild.value || document.getElementById(rowID+"-"+c[1]).innerText;
  //get the XCH_USD_GBP field of the given row
  let xchDP = document.getElementById(rowID+"-"+c[2]).firstChild.value || document.getElementById(rowID+"-"+c[2]).innerText;
  
  if (AMOUNT!="" && xchDP!="") {

    let op = c[0];
    let rule = {};
    rule[op] = [{"var":"a"},{"var":"b"}];

    let values = {};
    values["a"] = parseFloat(AMOUNT);
    values["b"] = parseFloat(xchDP);

    var gbpProjVal = jsonLogic.apply(rule, values);
    let gbpProj = document.getElementById(rowID+"-PROJ")

    //create event for table update
    let event1 = new CustomEvent("customEvent", {detail: {name: "recordUpdate",target: gbpProj, text: gbpProjVal.toFixed(2), trigger: "calcGBPval"}})
    document.dispatchEvent(event1);

  }

};

