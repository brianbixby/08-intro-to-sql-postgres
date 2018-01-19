![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 08: SQL and PostgreSQL
===

## Code Wars Challenge

Complete [today's Kata](https://www.codewars.com/kata/format-words-into-a-sentence) and follow the submission instructions from Lab 01.

## Lab 08 Submission Instructions
Follow the submission instructions from Lab 01.

## Resources  
[SQL Syntax Cheatsheet](cheatsheets/sql.md)

[PostgreSQL Shell Cheatsheet](cheatsheets/postgress-shell.md)

[PostgreSQL Docs](https://www.postgresql.org/docs/)

## Configuration
_Your repository must include:_

```
08-sql-intro-and-postgres
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── data
│   │   └── hackerIpsum.json
│   ├── index.html
│   ├── new.html
│   ├── scripts
│   │   ├── article.js
│   │   └── articleView.js
│   ├── styles
│   │   ├── base.css
│   │   ├── fonts
│   │   │   ├── icomoon.eot
│   │   │   ├── icomoon.svg
│   │   │   ├── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   ├── icons.css
│   │   ├── layout.css
│   │   └── modules.css
│   └── vendor
│       └── styles
│           ├── default.css
│           ├── normalize.css
│           └── railscasts.css
└── server.js
```

## User Stories and Feature Tasks

*As a user, I want to store my articles in a database so that my articles are available for users from an external source.*

- Install and require the NPM PostgreSQL package `pg` in your server.js file.
- Make sure to complete the connection string.
  - Windows and Linux users: You should have retained the user/password from the pre-work for this course. Your OS may require that your connection string is composed of additional information including user and password. For example: `const conString = 'postgres://USER:PASSWORD@HOST:PORT/DBNAME'`;
  - Mac users: `const conString = 'postgres://localhost:5432'`;
- Pass the appropriate argument when instantiating a new Client.
- The articleView.js methods are different now that we are not accessing the JSON file directly, and instead retrieving the articles from a database. Therefore, we no longer need to export the JSON, so remove all code that was involved in performing this action.

*As a developer, I want to review my code base so that I have a deep understanding of its overall functionality.*

- Study each of the new routes in your server.js file by examining the SQL statements and any associated data being handed through the request.
- For each of the `COMMENT` items in server.js, provide a brief description of what that function immediately below is doing. Be sure to indicate, where applicable, details such as:
  - Which method of article.js is interacting with this particular piece of server.js?
  - What part of ***CRUD*** is being enacted/managed by this particular piece of code?
  - As applicable, an additional sentence or two of explanation about what the code is doing, what NPM packages are involved, etc. The goal is to demonstrate that you understand what is going on in the code without glossing over details, but also without writing a novel about it.

## Documentation
# 08-intro-to-sql-postgres

**Author**: Brian Bixby
**Version**: 1.0.0

## Overview
This assignment was an introduction to crud and working with a local dbms through express and other NPM modules.

## Getting Started
Project setup (more for me than you, pretty detailed)
    The first thing I did was a npm init -y inside of the starter code folder. This creates a package.json with meta data about my project. Next I did a (npm i -S), this saves all of the project's dependencies to the package.json. Next I created a gitignore at the root of the repo itself so node and environment modules dont get uploaded to github. Next I created a new branch and duplicated the start-code in a new folder, then I did a git init and a initial commit up to my github repo.
From Here a user needs to npm i -S pg (postgres) and require it in the server.js, then create a connection string and update the client constant. Then remove the line of code exporting the json.

## Architecture
For this project I utilized Github, Node and the following NPM node modules
    - Express
    - Postgres
    - Body parser
    - File system

## Change Log
01-19-2018 9:30am - Initial commit with my project setup above done including installing dependencies and a .gitignore 
01-19-2018 11:50am - finished all comments on server.js and removed line of code exporting json.
01-19-2018 12:00am - Updated comments with npm modules used

## Credits and Collaborations
Codefellows https://github.com/codefellows-seattle-301d29 
Isaac and Kat for answering my many questions