//-------------------------------- init ----------------------------------------------
import dataBase from './dataBase.js';
import changeRecord from './eventHandler.js';
//import Data from './data.json';
var Datastore = require('nedb');
var db = new Datastore({ filename: 'db.db', autoload: true });

var dataB = new dataBase(db);
dataB.DisplayData();

//-------------------------------- functions -----------------------------------------



//-------------------------- commands ----------------------------------------------

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || text.innerText;   
    var change = new changeRecord(db,target);
    change.main();
}, false);