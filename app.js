var express = require('express');
var app = express();
var moncl = require('./models/moncl');
//global variable
obj = new moncl("mongodb://localhost/test2");

var staticDetails = {
  name: "static",
  anything:[
    {
      name: "dummy",
      type: "dummyTest"
    },
    {
      name: "dummy2",
      type: "dummyTest2"
    }
  ]
} // End of staticDetails

app.use(express.static(__dirname + "/public"));
//

app.get('/test/insert', function (req, res, next) {
  obj.insertJSON(staticDetails);
  res.send("Finish saving details to the mongoDB");
});

app.get('/test/:name', function (req, res, next) {
  var query = obj.find({name: req.params.name});
  query.exec(function(err,q){
     if(err)
        return console.log(err);

     console.log(q);
     q.forEach(function(test){
        console.log(test.name);
        console.log(test.anything);
        console.log(test.anything.length);
     });
  });
  res.send("Done");
});

app.listen(3001);
console.log("Server running on port 3001");
