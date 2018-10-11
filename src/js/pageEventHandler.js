import runAccounting from './accounting.js';
import runMain from './main.js';


export default function addPageEventHandler () {

document.addEventListener("pageEvent", function(event) {
  console.log("pageHandler: ",event.detail)
  switch (event.detail.name) {    

    case "runAccountingUSD":
      //set the accounting page as active
      $("#main").attr("active","false")
      $("#GBPtab").attr("active","false")
      $("#accounting").attr("active","true")
      $("#accounting").attr("Currency","$")
      $("#accounting").attr("CurrencyName","USD")
      $("#USDtab").attr("active","true")


      runAccounting();
      break;

    case "runAccountingGBP":
      //set the accounting page as active
      $("#main").attr("active","false")
      $("#USDtab").attr("active","false")
      $("#accounting").attr("active","true")
      $("#accounting").attr("Currency","£")
      $("#accounting").attr("CurrencyName","GBP")
      $("#GBPtab").attr("active","true")

      runAccounting();
      break;

    case "runMain":
      //set the main page as active
      $("#accounting").attr("active","false")
      $("#GBPtab").attr("active","false")
      $("#USDtab").attr("active","false")
      $("#main").attr("active","true")
      
      runMain();
      break;

  }

});

}