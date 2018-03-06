import datastore from 'nedb-promise'
var results={};

class dataBase {
  constructor(D){
  
    this.data=D;
    /*this.dataPromise = D.find({}, function(err,docs){
      //resolve(docs);
      console.log(err,docs);
      return docs;
    });
    this.dataPromise2 = console.log("5555555555555");*/
  };

    add(content){

      db.insert(content);
      console.log(content);

      return 0;
    };

    find (obj){
  
      db.find(obj, function (err, docs) {
        for (var i in docs){
        console.log(docs[i]);
         };
      });
    };

    async DisplayData(){
      //console.log("777777777777")
      
      var doc = await this.data.find({}, function(err,docs){
        if (err) throw err;
        console.log(docs);
        return docs;
      });
      console.log(doc); 
      //cont(docs);
    };

    ClearDb (){
      db.remove({}, { multi: true }, function(err, numDeleted) {  
      console.log('Deleted', numDeleted, 'entries');
      });
    }

    cont (d) {
      console.log("cont");
    //console.log(data[0].entries);
      var table=document.getElementById('table');
      var mainRow = document.createElement('div');
      mainRow.classList.add('row');
      var tableCell = document.createElement('div');
      tableCell.classList.add('col-sm');
      tableCell.setAttribute("contenteditable", "true");

      for (var i=0;i<data[0].entries.length ;i++){
    
        var r = document.createElement('div');
        r.classList.add('row');
    
        for (var j in data[0].entries[i]){
        
          var col = document.createElement('div');
          col.classList.add('col-sm');
          console.log(d[0].entries[i][j]);
          col.innerHTML = d[0].entries[i][j];
          r.appendChild(col);
        };
        tableCell.appendChild(r);
      };
      mainRow.appendChild(tableCell);
      table.appendChild(mainRow);

      return 0;
    };

};

export default dataBase;