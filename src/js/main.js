//-------------------------------- init ----------------------------------------------

import DataBase from './dataBase.js';
import modalContent from './modal.js';
import populateTable from './tableHandler.js';
import eventListener from './eventListener.js';
import RecordUpdate from './eventHandler.js';


//-------------------------------- data -----------------------------------------------


var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

var dataB = new DataBase(db);


//import Data from './data.json';
//dataB.clearDb();
//dataB.populateDb(Data);

//-------------------------------- functions -----------------------------------------


function createModal(){

  var m=modalContent();
  document.getElementById("container").innerHTML+=m;

};

function rUpdate(targ, text){
  console.log(targ, text)
    var upd = new RecordUpdate(db,targ, text);
    upd.main();
}


$(document).ready(eventListener(jQuery, rUpdate));

//-------------------------- commands ----------------------------------------------

createModal();  //appending data from external file

dataB.fetchData(populateTable);  //reading data from database, then populating html table

//document.getElementById("plusButton").setAttribute("disabled",true);
