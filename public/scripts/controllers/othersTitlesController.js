'use strict';
var app = app || {};

(function(module) {
  const otherTitlesController = {};

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  //This function is calling the customers data to define the view we will see. It uses the customerView.index function located in the customerView.js file.
  otherTitlesController.index = (ctx) => app.customerView.index(ctx.customers);

  // REVIEW: Middleware for grabbing one customer by ID:
  otherTitlesController.loadById = (ctx, next) => {
    let customerData = customer => {
      ctx.customers = customer;
      next();
    };

    // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
    // This function is finding the customers by ID. There is no other functions called in the function.
    app.Customer.findWhere('customer_id', ctx.params.customer_id, customerData);
  };

  // REVIEW: Middleware for grabbing ALL customers:
  otherTitlesController.loadAll = (ctx, next) => {
    let customerData =  () => {
      ctx.customers = app.Customer.all;
      next();
    };

    if (app.Customer.all.length) {
      ctx.customers = app.Customer.all;
      next();
    } else {
      app.Customer.fetchAll(customerData);
    }
  };

  module.otherTitlesController = otherTitlesController;
})(app);
