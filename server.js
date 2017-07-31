// 'use strict';
// const pg = require('pg');
// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');
// const requestProxy = require('express-request-proxy'); // REVIEW: We've added a new package here to our requirements, as well as in the package.json
// const PORT = process.env.PORT || 4000;
// const app = express();
//
// // const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
// const conString = 'postgres://localhost:5432/'; // DONE: Don't forget to set your own conString
// const client = new pg.Client(conString);
// client.connect();
// client.on('error', err => console.error(err));
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('./public'));
//
// // This function is a proxy method that acts as middleware for our Github API request. We need it to send our request for the API and call back the response while obfuscating our GITHUB_TOKEN value. It receives a request from the client.
// function proxyMovieDB(request, response) {
//   console.log('Routing The Movie DB request for', request.params[0]);
//   (requestProxy({
//     url: `https://api.themoviedb.com/${request.params[0]}`,
//     headers: {Authorization: `token ${process.env.THEMOVIEDB_TOKEN}`}
//   }))(request, response);
// }

// app.get('/', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/login', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/signup', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/movie-search', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/your-titles', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/others-titles', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/shared-titles', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/about-us', (request, response) => response.sendFile('index.html', {root: './public'}));
// app.get('/github/*', proxyGitHub);
