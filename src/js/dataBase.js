import datastore from 'nedb-promise'

class DataBase {

  constructor(D){
  
    this.data=D;
  };

    add(content){

      this.data.insert(content);
      console.log(content);

      return 0;
    };

    findData(){
        this.data.find({}, function(err,docs){
          //console.log(docs);
          populateTable(docs);
          });
    };


    clearDb (){
      this.data.remove({}, { multi: true }, function(err, numDeleted) {  
      console.log('Deleted', numDeleted, 'entries');
      });
    }

};

function populateTable(cont){

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
  
  return 0;
};

export default DataBase;