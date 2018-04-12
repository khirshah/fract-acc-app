window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js') // required for tooltip, popup...
require('bootstrap')

import './index.scss';
import runMain from './js/main.js';
import runAccounting from './js/accounting.js';



$(document).ready(function (a) {

  var t=a || window.event;

  $(".tab").on("click", function(t) {

    document.getElementById("container").innerHTML="";

    var target= t.target || a.srcElement;
    
    if (target.id=="accounting") {
      target.setAttribute("active","true")
      $("#main").attr("active","false")
      runAccounting();
    }
    
    else if (target.id=="main") {
      target.setAttribute("active","true")
      $("#accounting").attr("active","false")
      runMain();
    }
  })

})


$("#accounting").attr("active","true")
runAccounting();