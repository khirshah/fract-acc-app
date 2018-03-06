import _ from 'lodash';
import Data from './data.json';

function cont() {
  var c = document.createElement('div');
  c.classList.add('container');
  var mainRow = document.createElement('div');
  mainRow.classList.add('row');
  var tableCell = document.createElement('div');
  tableCell.classList.add('col-sm');

  for (var i=0;i<3;i++){
    var r = document.createElement('div');
    r.classList.add('row');
    for (var j in Data.entries[i]){
        var col = document.createElement('div');
        col.classList.add('col-sm');
        col.innerHTML = Data.entries[i][j];
        r.appendChild(col);
    }
    

    tableCell.appendChild(r);
  }
  mainRow.appendChild(tableCell);
  c.appendChild(mainRow);
  //c.innerHTML = _.join(['Hello', 'world!'], ' ');
  return c;
}

document.body.appendChild(cont());