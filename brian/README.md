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
