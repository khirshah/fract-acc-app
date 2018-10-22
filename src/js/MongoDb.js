const http = require('http');
const qs = require('qs');

var mode = "local"

const options = mode=="local" ? {port:process.env.PORT, hostname: process.env.localhost} : {hostname: process.env.hostname, path: '/mongoWrite',};

const connString = mode=="local" ? process.env.connectionstring : process.env.connStLoc;


class MongoDb {
  //read data from mongo database
  /*getData() {

    return new Promise((resolve, reject) => {
      http.get(process.env.connectionstring,(resp) => {
        let data = '';

        // A chunk of data has been recieved.

        //console.log("resp: ",resp)
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data)
          resolve(JSON.parse(data));
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err.message)
      });
    });
  }*/

  getData() {

    return new Promise((resolve, reject) => {

      let data = '';

      let currency = document.getElementById("accounting").getAttribute("Currency")
      let stDate = document.getElementById("startDateField").value
      var params = qs.stringify({curr:currency, startDate : stDate })

      options.method = 'POST'
      options.path = '/mongoRead'
      options.headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(params)
      };

      const req = http.request(options,(res) => {
        
        res.on('data', (chunk) => {
          data += chunk;

        });
        res.on('end', () => {
          resolve(JSON.parse(data));

        });
      });
      //error handling
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(err.message)
      });
      //write the data into the request
      req.write(params);
      //send the request to the server
      req.end();

    })
  }

  //update data in mongo
  insertData(obj) {

    return new Promise((resolve, reject) => {

      let dataLine;
      //create the datarow to insert
      const postData = qs.stringify(obj)
      
      //give the options required for the request
      options.method = 'POST'
      options.path = '/mongoWrite'
      options.headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
      };

      //create the request with the options above
      const req = http.request(options,(res) => {
        
        res.on('data', (chunk) => {
          dataLine = chunk;
          //console.log(JSON.parse(chunk));
        });
        res.on('end', () => {
          resolve(JSON.parse(dataLine).id);

        });
      });
      //error handling
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(err.message)
      });
      //write the data into the request
      req.write(postData);
      //send the request to the server
      req.end();
    })
  }


  updateData(id, key, value) {
    //data to be updated
    const putData = qs.stringify(
      {
        "_id":id,
        "dat": {
         [key]:value
        }
    })

    //give the options required for the request
    options.method = 'PUT'
    options.path = '/mongoUpdate'
        options.headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(putData)
      };

    //create the request with the options above
    const req = http.request(options,(res) => {
      console.log(res);
    });
    //error handling
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    //write the data into the request
    req.write(putData);
    //send the request to the server
    req.end();
  }

  removeData(id) {
    //id of the row to be deleted
    const removeD = qs.stringify(
      {
        "_id":id
    })
    //give the options required for the request

    options.method = 'DELETE'
    options.path = '/mongoRemove'
    options.headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(removeD)
      };

    //create the request with the options above
    const req = http.request(options,(res) => {
      console.log(res);
    });
    //error handling
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    //write the data into the request
    req.write(removeD);
    //send the request to the server
    req.end();
  }

}

export default MongoDb;