import datastore from 'nedb-promise'

class DataBase {

  constructor(D) {
  
    this.data=D;
  };

  
  populateDb(content) {

    this.data.insert(content);
    console.log(content);

    return 0;
  };

  fetchData(callback,action) {

    this.data.find({}, function(err,docs) {
      
      callback(docs);
    });
  };


  clearDb() {
    this.data.remove({}, { multi: true }, function(err, numDeleted) {  
    console.log('Deleted', numDeleted, 'entries');
    });
  };



};




export default DataBase;