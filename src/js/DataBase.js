import datastore from 'nedb-promise'

class DataBase {

  constructor(D) {
  
    this.data=D;
  };

  
  insertContent(content) {

    this.data.insert(content);

  };

  
  fetchData(callbacks) {

    this.data.find({}).sort({ ID: 1 }).exec(function (err, docs) {
      
      callbacks.drawTable(docs);
      callbacks.addInputRow();
      callbacks.addEventLis();

    });

  };

  
  findData(callback, id) {

    this.data.find({"ID": id},function(err,docs) {

      callback(docs);

    });
  };


  updateDbRec(ID,key,text){

    var value=text;
    var k=key;
    var toUpdate={};
    toUpdate[k]=value;
    
    this.data.update({_id : ID},{ $set: toUpdate},{}, function (err, numReplaced) { 
    
      if (err) throw err;
      console.log("replaced: ", numReplaced); 


    });
  };


  deleteRow(ID) {
    this.data.remove({ _id: ID }, {}, function (err, numRemoved) {
    // numRemoved = 1
    });
  
  };


  clearDb() {

    this.data.remove({}, { multi: true }, function(err, numDeleted) {  
    console.log('Deleted', numDeleted, 'entries');
    
    });
  
  };



};



export default DataBase;