const http = require('http');
const qs = require('qs')


class MongoDb {
  //read data from mongo database
  getData() {

    return new Promise((resolve, reject) => {
      http.get('http://localhost:3000/mongoRead',(resp) => {
        let data = '';

        // A chunk of data has been recieved.

        //console.log("resp: ",resp)
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(JSON.parse(data))
          resolve(JSON.parse(data));
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
        reject(err.message)
      });
    });
  }

  //update data in mongo
  insertData(obj) {

    return new Promise((resolve, reject) => {

      let dataLine;
      //create the datarow to insert
      const postData = qs.stringify(obj)
      //give the options required for the request
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

      //create the request with the options above
      const req = http.request(options,(res) => {
        
        res.on('data', (chunk) => {
          dataLine = chunk;
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


  updateData() {
    //data to be updated
    const putData = qs.stringify(
      {
        "_id":"5b688eecbf2b6a12da0be66a",
        "dat": {
         "USD":3200
        }
    })
    //give the options required for the request
    var options={
    hostname: 'localhost',
    port: '3000',
    path: '/mongoUpdate',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(putData)
      }
    }
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

  removeData() {
    //id of the row to be deleted
    const removeD = qs.stringify(
      {
        "_id":"5b688eecbf2b6a12da0be66a"
    })
    //give the options required for the request
    var options={
    hostname: 'localhost',
    port: '3000',
    path: '/mongoRemove',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(removeD)
      }
    }
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