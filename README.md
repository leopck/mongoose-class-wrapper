# mongoose-class-wrapper

Just a simple wrapper class for Mongoose NodeJS (MEAN stack)

##Problem statement:
I wanted to initialize all the schema, models, connections, insertion and finding from another class so that my app.js(main function) only has to call one object and it'll perform all the tedious task, leaving me to fill in the missing things only.

##Usage:

1.git clone this repo
2.npm install
3.go to Step 4 below

1.Download this git as .zip
2.Extract it
3.Copy models/moncl.js and paste into your desired project folder
4.Copy this lines
```
var moncl = require('./models/moncl');
obj = new moncl("mongodb://localhost/whateveryouwant");    <--------- Change this
```
5.Go into the models/moncl.js and edit the "moncl.prototype.createSchema" function. Define your desired schema. By default, a string and mixed schema was placed there as an example.
```
moncl.prototype.createSchema = function () {
  this.newSchema = new mongoose.Schema({
      name: String,                                         <--------- Change this
      anything: [mongoose.Schema.Types.Mixed],              <--------- Change this
      updated_at: { type: Date, default: Date.now }         <--------- Change this
    });
  };
```

6.After defining your own schema in step 5, go to "moncl.prototype.insertJSON" function and change the way to read the JSON/your data that you want to pass in. In this example's case, since the schema only has two things (excluding the date) I'll just be copying over the name(String) and anything(mixed schema) over.

```
moncl.prototype.insertJSON = function (JSONdetails) {
                                            ^------------------------- Your desired JSON input
  this.insScheme.name = JSONdetails.name;                   <--------- Change this
  this.insScheme.anything = JSONdetails.anything;           <--------- Change this
  this.saveService();
};
```

##Example

###Insert new JSON into mongoDB
```
var moncl = require('./models/moncl');
//global variable
obj = new moncl("mongodb://localhost/test2");     <------------------- Any mongodb link you like

var staticDetails = {                             <------------------- Array of JSON that you desire
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

app.get('/test/insert', function (req, res, next) {
              ^-------------------------------------------------------- Any link that you desire
  obj.insertJSON(staticDetails);
  res.send("Finish saving details to the mongoDB");
});

app.listen(3001);
console.log("Server running on port 3001");
```

###Query the mongoDB
```
var moncl = require('./models/moncl');
//global variable
obj = new moncl("mongodb://localhost/test2");     <------------------- Any mongodb link you like

app.get('/test/:name', function (req, res, next) {
              ^------------------------------------------------------- Any link that you desire
  var query = obj.find({name: req.params.name});  <------------------- Any query you want, in this example I'm finding for name
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
```
