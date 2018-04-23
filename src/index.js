//---------------------------- INIT ----------------------------------
// required for bootstrap
window.$ = window.jQuery = require('jquery') 
// required for tooltip, popup...
window.Popper = require('popper.js') 
require('bootstrap')

import './index.scss';
import {createTabs, tabEvents} from './js/pageHandler.js';
import runAccounting from './js/accounting.js';
import './apiCall.js';



//-------------------------- commands -------------------------------
//create tabs

createTabs();

//add events
$(document).ready(tabEvents());

//set the accounting page as active
$("#accounting").attr("active","true")

//run the accounting page, so this shows up first
runAccounting();