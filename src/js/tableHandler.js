import ColHeads from './metaData.json';

export function drawTable(cont) {

  //iterate through the content rows
  for (var i in cont){

      //and create rows of the html table accordingly
      var r = document.createElement('div');
      r.classList.add('row');

    for (var j in ColHeads){

      //same with the columns if they are visible
      if (ColHeads[j].visible){

        var col = document.createElement('div');
        col.setAttribute("id", cont[i]._id+"-"+ColHeads[j].name);
        col.classList.add('col-sm');
        
        //then we copy the data from the database to the html
        col.innerHTML = cont[i][ColHeads[j].name];
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

  for (var i in ColHeads){
    
    //if content is not editable
    if (ColHeads[i].editable==false) {
      
      //create divs
      let col = document.createElement('div');
      col.setAttribute("class",'col-sm');
      col.setAttribute("id",'newRow-'+ColHeads[i].name);

      if (ColHeads[i].name=="ID") {

        let ID=parseInt(table.lastChild.firstChild.innerHTML)+1

        col.innerHTML=ID;
      }

      //and fill them up with something if they are not the ID field
      else {
        
        col.innerHTML="something";  
      
      }
      
    //upon completion append col to row
    row.appendChild(col);

    }

    //otherwise if field is editable
    else {
      //create textarea input fields
      let inp = document.createElement('textarea');
      inp.setAttribute("type","text")
      inp.setAttribute("placeholder",'edit');
      inp.setAttribute("class",'col-sm');
      inp.setAttribute("id",'newRow-'+ColHeads[i].name);
      //upon completion append textarea to row
      row.appendChild(inp);

    };

  }

  //upon completion append row to table
  table.appendChild(row);
  
};



export function insertTableRow(content) {

  var r = document.createElement('div');
  r.classList.add('row');

  for (var j in ColHeads){

    if (ColHeads[j].name!="_id") {
      
      var col = document.createElement('div');
      col.setAttribute("id", content[0]._id+"-"+ColHeads[j].name);
      col.classList.add('col-sm');

      let key=ColHeads[j].name
      
      //we copy the data from the database to the html
      col.innerHTML = content[0][key];
      //at the end we insert the current cell to the row
      r.appendChild(col);
    };
  };
  //insert new row before last row of table
  table.insertBefore(r, table.lastChild);

};


export function updateTableCell(target,text) {

  target.innerText=text;
  target.removeAttribute("data-toggle");
  target.removeAttribute("data-target");

};


export function createDStruct(values) {

    let obj = {};
    for (var i in ColHeads) {
      
      let key=ColHeads[i].name
      if (key in values) {

        obj[key]=values[key];
      }
      else {
        if (key=="ID"){

          obj[key]=table.lastChild.firstChild.innerHTML
        }
        else if (key!="_id") {
          obj[key]="something"
        }
        
      } 
    };

    return obj;
  }