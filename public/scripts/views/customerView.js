'use strict';
var app = app || {};

(function(module) {
  const customerView = {};

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function is using Handlebars to compile a template for articles and passing the articles data into the template, also formatting how the articles' date data displays. It doesn't call any other functions.
  const render = function(customer) {
    let template = Handlebars.compile($('#customer-template').text());

    customer.body = marked(customer.body);

    return template(customer);
  };

  // REVIEW: Refactor this method so it works with any number of customers.
  // Also, it should be idempotent, so it can be run multiple times with identical results.
  customerView.index = function(customers) {
    $('#customers').show();
    $('#customers customer').remove();
    customers.forEach(a => $('#customers').append(render(a)))
  };

  module.customerView = customerView;
})(app);
