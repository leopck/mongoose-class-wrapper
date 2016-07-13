var mongoose = require('mongoose');

function moncl(mongouri) {
  //Create a public variable:
  //This is definetely a public class variable!
  this.mongouri = mongouri;
  this.connect();
  this.createSchema();
  this.createModel();
  this.startService();
}

moncl.prototype.connect = function () {
  mongoose.connect(this.mongouri, function(err) {
    if (err) throw err;
  });
};

moncl.prototype.createSchema = function () {
  this.newSchema = new mongoose.Schema({
      name: String,
      anything: [mongoose.Schema.Types.Mixed],
      updated_at: { type: Date, default: Date.now }
    });
  };

moncl.prototype.createModel = function () {
  this.objScheme = mongoose.model('newSchema', this.newSchema);
};

moncl.prototype.startService = function () {
  this.insScheme = new this.objScheme();
  return this.insScheme;
};

moncl.prototype.insertJSON = function (JSONdetails) {
  //Receives a JSON details to fill into mongoose
  //Parse thru the JSON and fill into mongoose
  //save mongoose schema
  this.insScheme.name = JSONdetails.name;
  this.insScheme.anything = JSONdetails.anything;
  this.saveService();
};

moncl.prototype.saveService = function () {
    //This line was found thru trial and error and some instinct after noticing that the classes couldn't find the functions
    //The problem is in JS scopes if there's another class/object calling - I cannot use 'this'
    //'this' would call the immediate class object
    //Passing the parent as another global variable is a good soln
    ParentClass = this;
    console.log("Performing saving action");
    this.insScheme.save(function (err, savedObject) {
    if (err) throw err;
    // if(err){
    //   console.log(err);
    //   ParentClass.res.status(500).send();
    //   ParentClass.next();
    // }
    else{
      console.log("Success in mongoose");
    }
  });
};

moncl.prototype.find = function (searchValue) {
  //This line was found thru trial and error and some instinct after noticing that the classes couldn't find the functions
  //The problem is in JS scopes if there's another class/object calling - I cannot use 'this'
  //'this' would call the immediate class object
  //Passing the parent as another global variable is a good soln
  ParentClass = this;
  return this.objScheme.find(searchValue, function (err, foundData) {
    if (err) throw err;
    // if(err){
    //   console.log(err);
    //   ParentClass.res.status(500).send();
    //   ParentClass.next();
    // }
  });
};


moncl.prototype.getURI = function () {
  console.log(this.mongouri);
};

module.exports = moncl;
