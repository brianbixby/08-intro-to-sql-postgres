'use strict';
// FILE SYSTEM THIS ALLOWS NODE TO INTERACT WITH LOCAL FILES BECAUSE I HAVE DB RUNNING ON MY LOCAL MACHINE
const fs = require('fs');
// EXPRESS ALLOWS SERVER SIDE JAVASCRIPT TO BE EXECUTED
const express = require('express');
// POSTGRES DBMS - database management system which we will be interacting with
const pg = require('pg');
// BODYPARSERallows us to parse request body of incoming requests for us to post our api. good for posts and puts. This middleware that interacts of the middle of the requests manipulates request object then sends it to the server
const bodyParser = require('body-parser');
// WHERE WE RUN OUR SERVER
const PORT = process.env.PORT || 3000;
const app = express();
// DEFAULT DATABASE PORT
const conString = 'postgres://localhost:5432';
// ALLOWS USER TO READ AND WRITE TO DB
const client = new pg.Client(conString);
// REVIEW: Use the client object to connect to our DB.
client.connect();

// REVIEW: Install the middleware plugins so that our app can use the body-parser module.
// basically tells the system that you want json to be used.
app.use(bodyParser.json());
// my research shows me that if extended: true, then you can parse nested objects, or generally any type. However, if you set extended: false, then you can only parse strings or arrays.
app.use(bodyParser.urlencoded({extended: true}));
// Our client facing files are now in public so we can tell express to serve those static files in that directory.
app.use(express.static('./public'));


// REVIEW: Routes for requesting HTML resources
app.get('/new', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // All of the full-stack diagram corresponds with this route and get request. When the user goes to the /new page from thie computer they are making a request to a server that then queries a database, the database sends the result to the server which in turn send the response to the client which then renders the page because of the client side javascript in this project. This is the read in crud. NPM modules used are express for the server, postgres as the dbms and fs to interect with postgres and the files within it on my local machine. Basically this creates a new route (/new) and on this page the new.html resource will be loaded.
  response.sendFile('new.html', {root: './public'});
});


// REVIEW: Routes for making API calls to use CRUD Operations on our database
app.get('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // All of the full-stack diagram corresponds with this route and get request. When a user goes to the /articles page they are making a request to a server, the server then queries the database for all entries within the articles table. This result is sent to the server which in turn is relayed to the client. The client side javascript in this project then renders the articles. This is the read in crud. NPM modules used are express for the server, postgres as the dbms and fs to interect with postgres and the files within it on my local machine.
  client.query('SELECT * FROM articles')
    .then(function(result) {
      response.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.post('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // All of the full stack diagram corresponds with this, when the user makes a post they are sending a request with a body to the server the server then queries the database to see if it can post a new article, the db sends the result (success or fail) to the server, which relays the response to the client. From here there is client side javascript that should give a success or fail message and redirect the user to a new page. This is the create portion of crud. NPM modules used are express for the server, postgres as the dbms, fs to interect with postgres and the files within it on my local machine and body parser to parse the body of the incoming request.
  client.query(
    `INSERT INTO
    articles(title, author, "authorUrl", category, "publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
    .then(function() {
      response.send('insert complete')
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.put('/articles/:id', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The entire full stack diagram again corresponds with this route, a user is updating an individual article this sends a request to the server which in turn queries the database to see if it can update an article, from here the database the result (success or fail) back to the server, which relays it to the client and client side javascript will be enacted based on the response the server gives it. This is the update portion of crud. NPM modules used are express for the server, postgres as the dbms, fs to interect with postgres and the files within it on my local machine and body parser to parse the body of the incoming request.
  client.query(
    `UPDATE articles
    SET
      title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
    .then(() => {
      response.send('update complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles/:id', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // All of the fullstack diagram again corresponds with this route. The user sends a request to the server to delete an article the server queries a database the database then sends a result back to the server and the server sends a response to the client and based on the response from the server certain client side javascript will be executed changing the user's view. This is the delete in crud. NPM modules used are express for the server, postgres as the dbms, fs to interect with postgres and the files within it on my local machine.
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // The entire fullstack diagram corresponds with this route. The user sends a request to the server the server then queries the database and the database sends a result back to the server whick then sends a response to the client and client side javascript is executed based on this response changing the ui view. This is the delete in crud. NPM modules used are express for the server, postgres as the dbms, fs to interect with postgres and the files within it on my local machine.
  client.query(
    'DELETE FROM articles;'
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

// COMMENT: What is this function invocation doing?
// theloadbd call is hoisting the load db function. The function queries the database for a table of users if the user table does not exist it will create one with the fields and data-types specified in the query. Then it calls the loadArticles function which queries a count from the database and if there is nothing in the databse it loads our json file into the databse.
loadDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // All of the full stack diagram corresponds with this function. The user goes to a page and theclient makes a request to the server which then queries a count from the articles table of the database then the database then sends a result back to the server the server sends the response to the client, the client then enacts client side javascript and changes the ui. Thi is a read in crud.
  client.query('SELECT COUNT(*) FROM articles')
    .then(result => {
    // REVIEW: result.rows is an array of objects that PostgreSQL returns as a response to a query.
    // If there is nothing on the table, then result.rows[0] will be undefined, which will make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
    // Therefore, if there is nothing on the table, line 158 will evaluate to true and enter into the code block.
      if(!parseInt(result.rows[0].count)) {
        fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
              INSERT INTO
              articles(title, author, "authorUrl", category, "publishedOn", body)
              VALUES ($1, $2, $3, $4, $5, $6);
            `,
              [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
            )
          })
        })
      }
    })
}

function loadDB() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // All of the fullstack diagram correspond.The client sends a request to the server which then sends the query below to the database and the database sends a result back to the server which sends a response to the client which executes client side javascript based on the response it gets, changing the ui of the page. This is the read in crud. 
  client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
  )
    .then(() => {
      loadArticles();
    })
    .catch(err => {
      console.error(err);
    });
}
