const https = require('http');

https.get( 'http://localhost:3000/mongo',(resp) => {
  let data = '';

  // A chunk of data has been recieved.

  console.log("resp: ",resp)
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