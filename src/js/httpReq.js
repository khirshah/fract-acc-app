const http = require('http');
const querystring=require('querystring')

export function getData() {

  http.get( 'http://localhost:3000/mongoRead',(resp) => {
    let data = '';

    // A chunk of data has been recieved.

    //console.log("resp: ",resp)
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);


  });
}

export function insertData() {

  const postData = querystring.stringify({

    "USD": 7800,
    "GBP_PROJ": 56,
    "GBP": 0.00,
    "TRANS_TYPE": "IC",
    "TRANS_DATE": "2017-07-12",
    "TRANS_REF": "#CS24",
    "TRANS_DESC": "$7800.00 USD  =  £6037.27 GBP  [inv: £6064.94 | 31/05/17]",
    "XCH_USD_GBP": 0.7740096914,
    "XCH_GBP_USD": 1.2919734870
  })

  var options={
    hostname: 'localhost',
    port: '3000',
    path: '/mongoWrite',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const req = http.request(options,(res) => {
    console.log(res);
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  req.write(postData);
  req.end();
}

export function updateData(){

    const putData = querystring.stringify({
    "_id":"5b688eecbf2b6a12da0be66a",
    "USD": 2200,
    "GBP_PROJ": 56,
    "GBP": 0.00,
    "TRANS_TYPE": "IC",
    "TRANS_DATE": "2017-07-12",
    "TRANS_REF": "#CS24",
    "TRANS_DESC": "$7800.00 USD  =  £6037.27 GBP  [inv: £6064.94 | 31/05/17]",
    "XCH_USD_GBP": 0.7740096914,
    "XCH_GBP_USD": 1.2919734870
  })
    var options={
    hostname: 'localhost',
    port: '3000',
    path: '/mongoUpdate:5b688eecbf2b6a12da0be66a',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(putData)
    }
  }

  const req = http.request(options,(res) => {
    console.log(res);
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  req.write(putData);
  req.end();
}