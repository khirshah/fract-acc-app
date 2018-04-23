
// set endpoint and your access key
const endpoint = 'live'
const currencies='GBP,NZD'
const access_key = '1dfb51ad6a7a8713cd6754158d6b1ce9';
const url = 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + currencies;

function apiCall(){

  fetch(url)
  .then(function(data) {
    console.log(data)
  })
  .catch(function(error){
    console.log(error)
  })
}

apiCall();

// get the most recent exchange rates via the "live" endpoint:
/*$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&currencies=' + currencies,   
    dataType: 'jsonp',
    success: function(json) {

        console.log(json);

        // exchange rata data is stored in json.quotes
        console.log(json.quotes.USDGBP);
        
        // source currency is stored in json.source
        console.log(json.source);
        
        // timestamp can be accessed in json.timestamp
        console.log(json.timestamp);
        
    }
});*/