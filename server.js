'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy'); // REVIEW: We've added a new package here to our requirements, as well as in the package.json
const PORT = process.env.PORT || 4000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://localhost:5432/myapp_test'; // DONE: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

// SQL query to create media table

// CREATE TABLE IF NOT EXISTS Media (
// media_id SERIAL PRIMARY KEY,
// url_string text
// );

//SQL query to create customer table.

// CREATE TABLE IF NOT EXISTS Customer (
// customer_id SERIAL PRIMARY KEY,
// username VARCHAR(100),
// password VARCHAR(100),
// name VARCHAR(255),
// email VARCHAR(255)
// );

// SQL query to insert a row into Media

// INSERT INTO Media
// (url_string)
// VALUES ('https://www.themoviedb.org/tv/1399-game-of-thrones'
// );

// SQL query to insert a row into Customer

// INSERT INTO Customer
// (username, password, name, email)
// VALUES ('carrieH','lilies','Carrie Hans', 'carriehans@gmail.com');

// SQL Query to create associative table
// Customers_Medias, ensuring that a customer
// cannot add the same title to their queue twice

// CREATE TABLE IF NOT EXISTS Customers_Medias (
// customer_id INT REFERENCES Customer(customer_id),
// media_id INT REFERENCES Media(media_id),
// CONSTRAINT queue_item UNIQUE (customer_id, media_id));

// Insert values into Customers_Medias table

// INSERT INTO Customers_Medias
// (customer_id, media_id)
// VALUES (1,5);

// Query selecting url_strings for all
// queue items two customers
// have in common

// SELECT DISTINCT url_string
// FROM Media
// INNER JOIN Customers_Medias
// ON Media.media_id = Customers_Medias.media_id
// WHERE Customers_Medias.media_id IN
// (SELECT media_id
// FROM Customers_Medias
// GROUP BY media_id
// HAVING COUNT(*) > 1);

// To select usernames from Customer table

// SELECT username FROM Customer;
