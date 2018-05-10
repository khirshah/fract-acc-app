import runAccounting from './accounting.js';
import runMain from './main.js';


export default function addPageEventHandler () {

document.addEventListener("pageEvent", function(event) {
  console.log("pageHandler: ",event.detail)
  switch (event.detail.name) {    

    case "runAccounting":
      //set the accounting page as active
      $("#main").attr("active","false")
      $("#accounting").attr("active","true")
      //run the accounting page, so this shows up first
      runAccounting();
      break;

    case "runMain":
      console.log("I am running for some reason I have no idea of")
      $("#accounting").attr("active","false")
      $("#main").attr("active","true")
      runMain();
      break;

  }

});

}