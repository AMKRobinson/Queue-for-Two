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

  Customer.allAuthors = () => {
    return Customer.all.map(article => article.author)
                      .reduce((names, name) => {
                        if (names.indexOf(name) === -1) names.push(name);
                        return names;
                      }, []);
  };

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function is counting the total number of words in each author's articles. It calls Customer.allAuthors(), which also lives in this file.
  Customer.numWordsByAuthor = () => {
    return Customer.allAuthors().map(author => {
      return {
        name: author,
        numWords: Customer.all.filter(a => a.author === author)
                             .map(a => a.body.match(/\b\w+/g).length)
                             .reduce((a, b) => a + b)
      }
    })
  };

  Customer.stats = () => {
    return {
      numCustomers: Customer.all.length,
      numWords: Customer.numWordsAll(),
      Authors: Customer.allAuthors(),
    }
  };

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // This function can be used to delete all articles from the blog. It doesn't call any other functions.
  Customer.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
    .then(console.log)
    .then(callback);
  };

  Customer.prototype.insertRecord = function(callback) {
    $.post('/articles', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
    .then(console.log)
    .then(callback);
  };

  Customer.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
    .then(console.log)
    .then(callback);
  };

  Customer.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
    .then(console.log)
    .then(callback);
  };

  module.Customer = Customer;
})(app);
