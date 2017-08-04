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

// This route, the app.get('/', etc) route, is a route that will send a request to fetch index.html's content for the web app. It receives a request from the HTML triggered by the user.
app.get('/', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/sign-up', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/login', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/find-movie', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/your-titles', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/others-titles', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/media-matches', (request, response) => response.sendFile('index.html', {root: './public'}));
app.get('/about-us', (request, response) => response.sendFile('index.html', {root: './public'}));

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

// route for query to database gathering all unique url_strings between customers
// app.get('/media-matches', (request, response) => {
//   client.query(`SELECT DISTINCT url_string
//   FROM Media
//   INNER JOIN Customers_Media
//   ON Media.media_id = Customers_Media.media_id
//   WHERE Customers_Media.media_id IN
//   (SELECT media_id
//   FROM Customers_Media
//   GROUP BY media_id
//   HAVING COUNT(*) > 1);`)
//   .then(result => response.send(result.rows))
//   .catch(console.error);
// })

// SELECT url_string
// FROM Media
// WHERE customer_id = $1 OR customer_id = $2
// GROUP BY url_string
// HAVING COUNT(*) > 1;

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
  // client.query(`SELECT * FROM Media;`)
  .then(data => response.json(data))
  // request
  //   .get('https://api.themoviedb.org/3/' )
  //   .query({
  //     api_key: process.env.THEMOVIEDB_TOKEN,
  //   })
  // .then(data => {
  //   console.log('bite me', response.body)
  //   response.json(data.body)
  // })
  // .catch(console.error)
})

// app.get('/themoviedb', (req, res) => {
//
//   request
//   .get('https://api.themoviedb.org/3/search/multi')
//   .query({
//     language: 'en-US',
//     page: 1,
//     include_adult: false,
//     api_key: process.env.THEMOVIEDB_TOKEN,
//     query: req.query.data
//   })
//   .then(data => {
//     res.json(data.body)
//   })
//   .catch(console.error)
// });

// route for gathering all of the users from our Customers table
app.get('/users', (request, response) => {
  client.query(`SELECT * FROM Customers;`)
  .then(result => response.send(result.rows))
  .catch(console.error);
})
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

// route for inserting customer_id for Customer and media_id for media Customer selects into Customers_Media table

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

// function loadMedia() {
//   fs.readFile('./public/data/media.json', (err, fd) => {
//     JSON.parse(fd.toString()).forEach(ele => {
//       client.query(
//         'INSERT INTO Media(url_string) VALUES($1) ON CONFLICT DO NOTHING',
//         [ele.author, ele.authorUrl]
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
  // .then(loadCustomers)
  .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS Media (
    media_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customers(customer_id),
    url_string text,
    CONSTRAINT queue_item UNIQUE (customer_id, url_string)
    );`
  )
  // .then(loadMedia)
  .catch(console.error);

  // client.query(`
  //   CREATE TABLE IF NOT EXISTS Customers_Media (
  //   customer_id INT REFERENCES Customers(customer_id),
  //   media_id INT REFERENCES Media(media_id),
  //   CONSTRAINT queue_item UNIQUE (customer_id, media_id));`
  // )
  // .catch(console.error);
}
