//-------------------------------- init ----------------------------------------------

import DataBase from './dataBase.js';
import RecordUpdate from './eventHandler.js';

//-------------------------------- data -----------------------------------------------


var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

var dataB = new DataBase(db);


//import Data from './data.json';
//dataB.clearDb();
//dataB.add(Data);

//-------------------------------- functions -----------------------------------------

function addEvLis(){

  document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || text.innerText;   
    var upd = new RecordUpdate(db,target);
    upd.main();
  }, false);

};


function createTable(){

  var table=document.getElementById('table');
  table.setAttribute("contenteditable", "true");

};
//-------------------------- commands ----------------------------------------------

createTable();

dataB.findData();

addEvLis();