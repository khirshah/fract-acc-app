
// set endpoint and your access key
const endpoint = 'live'
const currencies='GBP'
const access_key = '1dfb51ad6a7a8713cd6754158d6b1ce9';
const url = 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + currencies;
var USDGBP=0.71;


function apiCall() {

  fetch(url).then((resp) => resp.json())
    .then(function (data) {
      var USDGBP = data.quotes.USDGBP
      window.localStorage.setItem('USDGBP', USDGBP);
      let date = new Date();
      window.localStorage.setItem('timestamp', date.getTime())
      var event = new CustomEvent('customEvent',{"detail":{name: "displayXchData", targ: document.getElementById("newRow-TRANS_DATE"), trigger: "APIcall"}});
      document.dispatchEvent(event);
      console.log("items set in local storage");
    })
    .catch(function(error) {
      console.log(error)
      })

};

export default apiCall;