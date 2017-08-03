'use strict';

var app = app || {};

(function(module) {
  function Customer(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Customer.all = [];

  // REVIEW: We no longer need our prototype toHtml() method. This functionality has been relocated to the view.
  //         As a result, Customer.prototype.toHtml has been deleted.

  // REVIEW: With ES6 arrow functions, if the function only has one parameter, you don't need parentheses.
  //         This is similar to saying Customer.loadAll = function(rows).
    // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
    // This function is loading data from the database, organizing them by data before using the data to instantiate Customer objects. It is calling the Customer. That function lives in this file, up above.
  Customer.loadAll = rows => {
    Customer.all = rows.map(ele => new Customer(ele));
  };

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function is querying the Customer.loadAll function for the Customers.loadAll objects instantiated by it, connecting it to the /articles route. It calls the Customer.loadAll function, which lives in this file as well.
  Customer.fetchAll = callback => {
    $.get('/users')
    .then(
      results => {
        Customer.loadAll(results);
        callback();
      }
    )
  };

  Customer.prototype.insertRecord = function(callback) {
    $.post('/customers', {username: this.username, password: this.password, name: this.name, email: this.email})
    .then(console.log)
    .then(callback);
  };

  module.Customer = Customer;
})(app);
