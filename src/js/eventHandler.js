
class RecordUpdate {
  constructor(data,target){

  this.target = target;
  this.data = data;

  };

  main(){
    var text = this.target.textContent || text.innerText;
    
    let ID = this.target.id.split("-");
    //console.log(this.target.id.split("-"));
    this.overwriteDbData(ID[0],ID[1]);
  };

  overwriteDbData(ID,key){

    var value=this.target.textContent;
    var k=key;
    var toUpdate={}
    toUpdate[k]=value;
    
    this.data.update({_id : ID},{ $set: toUpdate},{}, function (err, numReplaced) { 
    
      if (err) throw err;
      console.log(numReplaced) 

    });
    
    console.log(this.target);

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

};

export default RecordUpdate;