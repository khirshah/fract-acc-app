import arr from './array.json';

function populateTable(cont) {

  //iterate through the table rows
  for (var i=0;i<cont.length ;i++){
    //and create rows of the html table accordingly
    var r = document.createElement('div');
    r.classList.add('row');

    //same with the columns
    for (var j in cont[i]){
        
      var col = document.createElement('div');
      col.setAttribute("id", cont[i]._id+"-"+j);
      col.classList.add('col-sm');
      
      //then we copy the data from the database to the html
      col.innerHTML = cont[i][j];
      //at the end we insert the current cell to the row
      r.appendChild(col);

    };
    //when a row is filled, we insert that row to the table
    table.appendChild(r);
  
  };
  addRow();
  return 0;
};

function  addRow() {
  let row = document.createElement("div")
  row.setAttribute("class","row")

  for (var i in arr){

    let inp = document.createElement('textarea');
    inp.setAttribute("type","text")
    inp.setAttribute("placeholder",'edit');
    inp.setAttribute("class",'col-sm');
      
    row.appendChild(inp);
  }
  table.appendChild(row);
  
};

export default populateTable;