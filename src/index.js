//---------------------------- INIT ----------------------------------
// required for bootstrap
window.$ = window.jQuery = require('jquery') 
// required for tooltip, popup...
window.Popper = require('popper.js') 
require('bootstrap')

import './index.scss';

import {createTabs, tabEvents} from './js/pageHandler.js';
import addPageEventHandler from './js/pageEventHandler.js'

//-------------------------- commands -------------------------------

//create tabs
createTabs();

//add page eventlisteners
$(document).ready(tabEvents());

//add page event handlers
addPageEventHandler();

//run the accounting page, so this shows up first
var event=new CustomEvent("pageEvent",{detail: {name:"runAccountingGBP"}})
document.dispatchEvent(event);