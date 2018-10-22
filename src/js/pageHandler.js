
export function createTabs() {
  //create pageHeader
  let pH=document.createElement("div");
  pH.setAttribute("id","pageHeader");
  pH.classList.add("container-fluid");
  //create row for tabs
  var r=document.createElement("div");
  r.classList.add("row");

  var tabs=["main", "accounting"];
  //create tabs
  for (var i in tabs) {

    var m = document.createElement("div");
    m.classList.add("col-6");
    m.classList.add("tab");
    m.setAttribute("id",tabs[i]);
    m.innerHTML=tabs[i];

    r.appendChild(m);
  }
  
  //create row for subtabs
  var subTabsRow=document.createElement("div");
  subTabsRow.classList.add("row");
  subTabsRow.classList.add("justify-content-end");
  //create subtabs
  var accSubtabs = ["GBP", "USD"];
  for (var i in accSubtabs) {

    var m = document.createElement("div");
    m.classList.add("col-3");
    m.classList.add("tab");
    m.setAttribute("id",accSubtabs[i]+"tab");
    m.innerHTML = accSubtabs[i];

    subTabsRow.appendChild(m);
  }

  //create row for date filter
  var dateRow = document.createElement("div");
  dateRow.classList.add("row");
  dateRow.classList.add("justify-content-end");
  dateRow.setAttribute("id","dateFilter");
  
  //we create a new date
  var todayDate = new Date();
  
  //var twoMonthAgo = addMonthsUTC(todayDate,-2); 

  //create the column for the year
  var startDate = document.createElement("div");
  startDate.classList.add("col-1");
  startDate.setAttribute("id","startDate");

  var startDateField = document.createElement("select")
  startDateField.setAttribute("id","startDateField");
  
  var dateList = [];
  for (var i = 2015; i <= todayDate.getFullYear(); i++) {
      dateList.push(i);
  }

  for (var i in dateList){
    
    startDateField.options[startDateField.options.length] = new Option(dateList[i]);
  }
  
  startDateField.value = todayDate.getFullYear();

  //append date field
  startDate.appendChild(startDateField);
  dateRow.appendChild(startDate);

  //append tabs then subtabs then datefields to page header
  pH.appendChild(r);
  pH.appendChild(subTabsRow);
  pH.appendChild(dateRow);

  document.body.appendChild(pH);

  //create main container of page
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
      
      if (target.id == "USDtab") {

        var event1 = new CustomEvent("pageEvent",{detail: {name:"runAccountingUSD"}})
        document.dispatchEvent(event1);

      }

      if (target.id == "GBPtab") {

        var event1 = new CustomEvent("pageEvent",{detail: {name:"runAccountingGBP"}})
        document.dispatchEvent(event1);

      }
      
      else if (target.id == "main") {
        console.log("I'm running pageHandler")

        var event = new CustomEvent("pageEvent",{detail: {name:"runMain"}})
        document.dispatchEvent(event);
      }
    })

    $("#startDateField").on("change", function(t) {

        document.getElementById("container").innerHTML="";

        var event = new CustomEvent("pageEvent",{detail: {name:"showAnotherYear"}})
        document.dispatchEvent(event);
    })
  }
}