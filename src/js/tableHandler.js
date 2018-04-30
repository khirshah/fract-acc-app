//----------------------------------------- INIT -----------------------------------------------

import CH from '../data/metaData.json';
import dropDown from '../html/dropdown.js';
import jsonLogic from "json-logic-js";

var array=Object.keys(CH.columns)

var xch=0.71;

//----------------------------------------- FUNCTIONS -----------------------------------------

//------------------------------ zeropad -----------------------------
function zPad(n) {return n < 10 ? "0"+n : n;}


//---------------------- table initializer functions -----------------
function createTableHeader() {

  var tableHeader=document.createElement('thead');
  tableHeader.setAttribute("class","thead");  

  var headerRow = document.createElement('tr');
  headerRow.classList.add('row');

  for (var j in array){
    let variable=CH.columns[array[j]]
    if (variable.visible) {

      var col = document.createElement('td');
      col.setAttribute("scope","col");
      col.classList.add('col-sm');        
      col.innerHTML = variable.name

      headerRow.appendChild(col); 
    }

  }
  //to make the table look nice we add the extra column for the
  //delete button, but no button here
  headerRow.innerHTML+='<td class="col-sm"></td>';
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);
}

export function drawTable(cont) {

  createTableHeader();

  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  tableBody.setAttribute("class","tbody")
  tableBody.setAttribute("id","tbody")

  //iterate through the content rows
  for (var i in cont){

      //and create rows of the html table accordingly
      var r = document.createElement('tr');
      r.classList.add('row');
      r.setAttribute("id", cont[i]._id)

    for (var j in array){
      let variable=CH.columns[array[j]]

      //same with the columns if they are visible
      if (variable.visible){

        var col = document.createElement('td');
        col.setAttribute("id", cont[i]._id+"-"+array[j]);
        col.classList.add('col-sm');
        col.setAttribute("editable",variable.editable);

         //then we copy the data from the database to the html
        if (array[j]=="TRANS_DATE"){
          //we convert the format to browser locale value
          let date=new Date(cont[i][array[j]]);
          //and save the actual timestamp as an attribute of this field
          col.setAttribute("timestamp",date);
          col.innerHTML = date.toLocaleDateString();
        }

        else{
    
          col.innerHTML = cont[i][array[j]];
        }
        //at the end we insert the current cell to the row
        r.appendChild(col);

      };

    }
    let cellid=cont[i]._id+"-"+"delbtn";
    let btn = deleteButtons(cellid); 
    r.innerHTML+=btn;

    //when a row is filled, we insert that row to the table
    //console.log(document.getElementById(cellid))
    tableBody.appendChild(r);
    delBtnEvLis(cellid);

  
  };



  return 0;

};

function deleteButtons(id){

  return `<td id="`+id+ `"><button id=`+id+`0`+` class="btn delbtn">-</button></td>`;

}

function delBtnEvLis(id) {

  //--------------------- Delete row button clicked -------------------------
  $("#"+id+"0").on("click", function(t) {

    t = t || window.event;
    var target = t.target || e.srcElement;
    let ID=target.offsetParent.id.split("-")[0]
    $("#myModal").attr("rowId",ID)

    $(".modal-body").append(`<p>Are you sure?</p>`)

    $("#AcceptB").text("Delete row")
    $("#myModal").attr("funct","deleteRow")

    $("#myModal").modal("show",{
      keyboard: true
    });

  })
}


export function  addInputRow() {

  var row = document.createElement("tr")
  row.setAttribute("class","row")

  for (var j in array) {
    var variable=CH.columns[array[j]]

    if (variable.visible) {
        //create divs
      var col = document.createElement('td');
      col.setAttribute("class",'col-sm');
      col.setAttribute("id",'newRow-'+array[j]);
      col.setAttribute("editable",variable.editable);
      col.setAttribute("dataType",variable.dataType);

      switch (variable.inputType) {
        
        case "USER_INPUT":
          var inp = document.createElement('input');
          inp.setAttribute("placeholder",'edit');
          inp.classList.add('inp');

          col.appendChild(inp);
          break;

        case "DROPDOWN":
          var dd=dropDown();
          col.innerHTML+=dd;
          break;

        case "DATEINPUT":
          var dt = document.createElement('input');
          dt.setAttribute("type","date");
          dt.classList.add("inp");
          dt.classList.add("date");
          dt.setAttribute("id","dateinput")
          //we create a new date
          var date= new Date()

          dt.value=date.toISOString().split("T")[0];

          col.appendChild(dt);
          break;

        default:
          col.classList.add('inp')
          break;

      } 

      row.appendChild(col);

    };


  };

  // put the save button at the end of this row
  row.innerHTML+='<td id="newRow-button" class="col-sm"><button id="saveButton" class="btn">SAVE</button></td>';

  //upon completion append row to table
  document.getElementById("tbody").appendChild(row);
  document.getElementById("dateinput").value=date.toISOString().split("T")[0];
  
};

//------------------------- table update functions ----------------------------

export function insertTableRow(content) {

  var r = document.createElement('tr');
  r.classList.add('row');

  for (var j in array){
    let variable=CH.columns[array[j]]

    if (variable.visible) {
      
      var col = document.createElement('td');
      col.setAttribute("id", content[0]._id+"-"+array[j]);
      col.classList.add('col-sm');
      col.setAttribute("editable",variable.editable);
      
      //we copy the data from the database to the html
      col.innerHTML = content[0][array[j]];
      //at the end we insert the current cell to the row
      r.appendChild(col);
    };
  };
  
  let cellid=content[0]._id+"-"+"delbtn";
  let btn = deleteButtons(cellid); 
  r.innerHTML+=btn;
  //insert new row before last row of table
  let tbody=document.getElementsByClassName("tbody")[0]
  tbody.insertBefore(r, tbody.lastChild);
  delBtnEvLis(cellid);

};


export function updateTableCell(target,text) {

  target.removeAttribute("data-toggle");
  target.removeAttribute("data-target");


  if (target.id.split("-")[1]!="TRANS_DATE"){

    target.innerText=text;
  }
  else {
    //we format the date to user locale value
    let date=new Date(text);
    //and save the actual timestamp as an attribute this field
    target.setAttribute("timestamp",date);
    target.innerText=date.toLocaleDateString();

  }
};


export function createDStruct(values) {

    let obj = {};
    const now = new Date();
    for (var j in array) {

      let variable=CH.columns[array[j]]
        
      let key=array[j]
      //if value is user supported
      if (key in values) {

        obj[key]=values[key];
      
      }
      //column value is not coming from textarea
      else {
        if (key=="ID"){

          obj[key]=now.getTime();
        }
      } 
    
    };

    return obj;

  }

 //----------- calculate input field value -------------------------------------
export function calInpVal(target) {

  switch (target.id.split("-")[1]) {
    case "USD":

      //console.log(target.id.split("-")[1])
      calcGBPProj();

      break;

    case "XCH_USD_GBP":
      if (target.firstChild.value!="") {
        calcGBPProj();
        let gu = 1/target.firstChild.value;
        document.getElementById("newRow-XCH_GBP_USD").firstChild.value=gu.toFixed(5);
      }

      break;

    case "XCH_GBP_USD":
      
      if (target.firstChild.value!="") {
        let ug = 1/target.firstChild.value;
        document.getElementById("newRow-XCH_USD_GBP").firstChild.value=ug.toFixed(5);       
      }

      break;

    default:
      break;
  }


}

function calcGBPProj() {

  let c=CH.columns.GBP_PROJ.calculation

  if (document.getElementById("newRow-"+c[1]).firstChild.value!="" && 
  document.getElementById("newRow-"+c[2]).firstChild.value!="") {

    let op=c[0]
    let rule={};
    rule[op]=[{"var":"a"},{"var":"b"}];

    let values={};
    values["a"]=parseFloat(document.getElementById("newRow-"+c[1]).firstChild.value);
    values["b"]=parseFloat(document.getElementById("newRow-"+c[2]).firstChild.value);

    var gbpProjVal=jsonLogic.apply(rule, values);

    document.getElementById("newRow-GBP_PROJ").innerHTML=gbpProjVal.toFixed(5);
  }
}