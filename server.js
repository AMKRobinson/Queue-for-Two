'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');
const requestProxy = require('express-request-proxy');

const PORT = process.env.PORT || 4000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://localhost:5432/myapp_test'; // DONE: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

// This function is a proxy method that acts as middleware for our Github API request. We need it to send our request for the API and call back the response while obfuscating our GITHUB_TOKEN value. It receives a request from the client.

app.get('/themoviedb', (req, res) => {

  request
  .get('https://api.themoviedb.org/3/search/multi')
  .query({
    language: 'en-US',
    page: 1,
    include_adult: false,
    api_key: process.env.THEMOVIEDB_TOKEN,
    query: req.query.data
  })
  .then(data => {
    res.json(data.body)
  })
  .catch(console.error)
});

// route for gathering all of the users from our Customers table
app.get('/users', (request, response) => {
  client.query(`SELECT * FROM Customers;`)
  .then(result => response.send(result.rows))
  .catch(console.error);
})

app.get('/media-matches', (request, response) => {
  console.log('whyyyyy', request.params[0]);
  client.query(`
    SELECT A.url_string
    FROM Media A, Media B
    WHERE A.customer_id = $1
    AND B.customer_id = $2
    AND A.url_string = B.url_string
    ORDER BY A.url_string;
    `,
    [
      request.query.other_customer_id,
      request.query.current_customer_id
    ]
  )
  .then(data => response.json(data))
})

app.get('/themoviedb2', (req, res) => {
  console.log(req.query)
  request
  .get('https://api.themoviedb.org/3/' + req.query.url_string)
  .query({
    api_key: process.env.THEMOVIEDB_TOKEN,
  })
  .then(data => {
    console.log(data.body)
    res.json(data.body)
  })
  .catch(console.error)
});

// route for adding new Customer data to DATABASE
app.post('/customers', function(request, response) {
  client.query(
    'INSERT INTO Customers(username, password, name, email) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING',
    [request.body.username,
      request.body.password,
      request.body.name,
      request.body.email],
    function(err) {
      if (err) console.error(err)
      response.send('insert complete');
    }
  )
});

app.post('/media', function(request, response) {
  client.query(
    'INSERT INTO Media (customer_id, url_string) VALUES ($1,$2) ON CONFLICT DO NOTHING',
    [request.body.customer_id, request.body.url_string],
    function(err) {
      if (err) console.error(err)
      response.send('insert complete');
    }
  )
});

loadDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

//////// ** DATABASE LOADERS ** ////////
////////////////////////////////////////
// Run this function once, calling it in loadDB() as seen below, to load pre-populated users, if you so choose
// function loadCustomers() {
//   fs.readFile('./public/data/customers.json', (err, fd) => {
//     JSON.parse(fd.toString()).forEach(ele => {
//       client.query(
//         'INSERT INTO Customers(username, password, name, email) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING',
//         [ele.username, ele.password, ele.name, ele.email]
//       )
//       .catch(console.error);
//     })
//   })
// }

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS Customers (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(100),
    name VARCHAR(255),
    email VARCHAR(255)
    );`
  )
  .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS Media (
    media_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customers(customer_id),
    url_string text,
    CONSTRAINT queue_item UNIQUE (customer_id, url_string)
    );`
  )
  .catch(console.error);
}
