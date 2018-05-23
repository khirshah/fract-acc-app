
// set endpoint and your access key
const endpoint = 'historical'
const currencies='GBP'
const access_key = '1dfb51ad6a7a8713cd6754158d6b1ce9';
var USDGBP=0.71;


function historicApiCall(date, target) {

const url = 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key +'&date='+ date + '&currencies=' + currencies;
  
  fetch(url).then((resp) => resp.json())
    .then(function (data) {
      var USDGBP = data.quotes.USDGBP
      window.localStorage.setItem('hist_USDGBP', USDGBP);
      var event = new CustomEvent('customEvent',{"detail":{name: "displayXchData", targ: target, trigger: "historicAPIcall"}});
      document.dispatchEvent(event);
    })
    .catch(function(error) {
      console.log(error)
      })

};

export default historicApiCall;