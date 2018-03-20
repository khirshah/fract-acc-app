
class RecordUpdate {
  constructor(data,target, text){

  this.target = target;
  this.data = data;
  this.text=text;

  };

  main(){
    
    let ID = this.target.id.split("-");

    this.overwriteDbData(ID[0],ID[1], this.text);
    this.updateTable();
  };

  overwriteDbData(ID,key){

    var value=this.text;
    var k=key;
    var toUpdate={}
    toUpdate[k]=value;
    
    this.data.update({_id : ID},{ $set: toUpdate},{}, function (err, numReplaced) { 
    
      if (err) throw err;
      console.log("replaced: ", numReplaced); 


    });


  };

  updateTable(text){
    this.target.innerText=this.text;
    this.target.removeAttribute("data-toggle");
    this.target.removeAttribute("data-target");

  };

};

export default RecordUpdate;