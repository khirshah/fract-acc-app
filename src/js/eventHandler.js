
class RecordUpdate {
  constructor(data,target){

  this.target = target;
  this.data = data;

  };

  main(text){
    //var text = this.target.textContent || text.innerText;
    
    let ID = this.target.id.split("-");
    //console.log(this.target);
    this.overwriteDbData(ID[0],ID[1], text);
    this.updateTable(text);
  };

  overwriteDbData(ID,key, text){

    var value=text;
    var k=key;
    var toUpdate={}
    toUpdate[k]=value;
    
    this.data.update({_id : ID},{ $set: toUpdate},{}, function (err, numReplaced) { 
    
      if (err) throw err;
      console.log("replaced: ", numReplaced); 

    //console.log(this.target);

    });




    
    //console.log(this.target);

    /*//find USD in 2nd row of entries and ommit USD and desc from results
    this.data.find({"entries.1.USD": {$regex : /.*\/}},{'entries.1.USD':0, 'entries.1.DESCRIPTION':0} ,function(err,docs){
      console.log(docs[0].entries[1].GBP);
      console.log(docs)
    })*/

    /*this.data.find({"entries.1.USD": {$regex : /.*\/}}, function(err,docs){
      console.log(docs.length);
      console.log(docs[0]._id);
      console.log(docs[0].entries[0]);
    })*/
    
  };

  updateTable(text){
    this.target.innerText=text;
    this.target.removeAttribute("data-toggle");
    this.target.removeAttribute("data-target");

  };

};

export default RecordUpdate;