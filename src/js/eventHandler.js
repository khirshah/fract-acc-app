
class RecordUpdate {
  constructor(data,target){

  this.target = target;
  this.data = data;

  };

  main(text){
    
    let ID = this.target.id.split("-");

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


    });


  };

  updateTable(text){
    this.target.innerText=text;
    this.target.removeAttribute("data-toggle");
    this.target.removeAttribute("data-target");

  };

};

export default RecordUpdate;