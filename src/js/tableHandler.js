import ColHeads from '../data/metaData.json';
import CH from '../data/metaData3.json';

var array=Object.keys(CH.columns)

function zPad(n) {return n < 10 ? "0"+n : n;}

function createTableHeader() {
  let tableHeader=document.createElement('thead');
  tableHeader.setAttribute("class","thead");  
  var headerRow = document.createElement('tr');
  headerRow.classList.add('row');

  for (var j in array){
    let variable=CH.columns[array[j]]
    if (variable.visible) {

      var col = document.createElement('th');
      col.classList.add('col-sm');        
      col.innerHTML = array[j]

      headerRow.appendChild(col); 
    }

  }
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);
}

export function drawTable(cont) {

  createTableHeader();

  //iterate through the content rows
  for (var i in cont){

      //and create rows of the html table accordingly
      var r = document.createElement('div');
      r.classList.add('row');

    for (var j in array){
      let variable=CH.columns[array[j]]

      //same with the columns if they are visible
      if (variable.visible){

        var col = document.createElement('div');
        col.setAttribute("id", cont[i]._id+"-"+array[j]);
        col.classList.add('col-sm');

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

    //when a row is filled, we insert that row to the table
    table.appendChild(r);
  
  };


  return 0;

};



export function  addRow() {

  let row = document.createElement("div")
  row.setAttribute("class","row")

  for (var j in array){
    let variable=CH.columns[array[j]]
    
    if (variable.visible){
    //if content is not editable
      if (variable.editable==false) {
        
        //create divs
        var col = document.createElement('div');
        col.setAttribute("class",'col-sm');
        col.setAttribute("id",'newRow-'+array[j]);
        //and fill them up with something
        col.innerHTML="sg";  
        
        
      //upon completion append col to row
      row.appendChild(col);

      }

      //otherwise if field is editable
      else {
        //create textarea input fields
        var inp = document.createElement('input');
        
        if (array[j]=="TRANS_DATE") {

          inp.setAttribute("type","date")
          //we create a new date
          let date= new Date()
          inp.value=date.toISOString().split("T")[0]

        }
        else {
          inp.setAttribute("type","text")
          inp.setAttribute("placeholder",'edit');
        }


        inp.setAttribute("class",'col-sm');
        inp.setAttribute("id",'newRow-'+array[j]);
        //upon completion append textarea to row
        row.appendChild(inp);
      };

    };

  };

  //upon completion append row to table
  table.appendChild(row);
  
};



export function insertTableRow(content) {

  var r = document.createElement('div');
  r.classList.add('row');

  for (var j in array){
    let variable=CH.columns[array[j]]

    if (variable.visible) {
      
      var col = document.createElement('div');
      col.setAttribute("id", content[0]._id+"-"+array[j]);
      col.classList.add('col-sm');
      
      //we copy the data from the database to the html
      col.innerHTML = content[0][array[j]];
      //at the end we insert the current cell to the row
      r.appendChild(col);
    };
  };
  //insert new row before last row of table
  table.insertBefore(r, table.lastChild);

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
         else if (key=="TRANS_DATE"){

          obj[key]=now.getTime();
        
        }
        else {
      
          obj[key]="sg"
      
        }
        
      } 


    };

    return obj;

  }