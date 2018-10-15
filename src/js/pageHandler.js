function addMonthsUTC (date, count) {
  if (date && count) {
    var m, d = (date = new Date(+date)).getUTCDate()

    date.setUTCMonth(date.getUTCMonth() + count, 1)
    m = date.getUTCMonth()
    date.setUTCDate(d)
    if (date.getUTCMonth() !== m) date.setUTCDate(0)
  }
  return date
}


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
  
  var twoMonthAgo = addMonthsUTC(todayDate,-2); 

  //create the columns for the dates
  var startDate = document.createElement("div");
  startDate.classList.add("col-3");
  startDate.setAttribute("id","startDate");

  var startDateField = document.createElement("input")
  startDateField.setAttribute("type","date");
  startDateField.classList.add("date");
  startDateField.setAttribute("id","startDateField");

  startDateField.max = todayDate.toISOString().split("T")[0];
  startDateField.value = twoMonthAgo.toISOString().split("T")[0];

  var endDate = document.createElement("div");
  endDate.classList.add("col-3");
  endDate.setAttribute("id","endDate");

  var endDateField = document.createElement("input")
  endDateField.setAttribute("type","date");
  endDateField.classList.add("date");
  endDateField.setAttribute("id","endDateField");


  endDateField.value = todayDate.toISOString().split("T")[0];
  endDateField.max = todayDate.toISOString().split("T")[0];
  
  //append date fields
  startDate.appendChild(startDateField);
  endDate.appendChild(endDateField);

  dateRow.appendChild(startDate);
  dateRow.appendChild(endDate)

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

        var event1=new CustomEvent("pageEvent",{detail: {name:"runAccountingUSD"}})
        document.dispatchEvent(event1);

      }

      if (target.id == "GBPtab") {

        var event1=new CustomEvent("pageEvent",{detail: {name:"runAccountingGBP"}})
        document.dispatchEvent(event1);

      }
      
      else if (target.id=="main") {
        console.log("I'm running pageHandler")

        var event=new CustomEvent("pageEvent",{detail: {name:"runMain"}})
        document.dispatchEvent(event);
      }
    })

  }
}