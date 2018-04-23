import runMain from './main.js';
import runAccounting from './accounting.js';

export function createTabs() {

  let pH=document.createElement("div");
  pH.setAttribute("id","pageHeader");
  pH.classList.add("container-fluid");

  var r=document.createElement("div");
  r.classList.add("row");

  var tabs=["main", "accounting"];

  for (var i in tabs) {

    var m = document.createElement("div");
    m.classList.add("col-6");
    m.classList.add("tab");
    m.setAttribute("id",tabs[i]);
    m.innerHTML=tabs[i];

    r.appendChild(m);
  }

  pH.appendChild(r);

  document.body.appendChild(pH);

  let cont=document.createElement("div");
  cont.setAttribute("id","container");
  cont.classList.add("container-fluid");

  document.body.appendChild(cont);

}

export function tabEvents(a) {

  return function (a) {

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

  }
}