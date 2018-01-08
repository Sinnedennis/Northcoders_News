# Northcoders News Back-end

An API built with [MongoDB](https://www.mongodb.com/) and [Express](https://expressjs.com/) to serve data to a responsive single page application which can be viewed in its deployed form by clicking [here](https://north-coding-news.herokuapp.com/). To see the application's code repository, [click here](https://github.com/Sinnedennis/Northcoders_News_Front_End). The brief was the create a single page application showing community-rated content in the theme of reddit. This project contains the API for serving the data, as well as seeding files to populate the database with mock articles and comments.
___

## Table of contents

* [Setup](https://github.com/Sinnedennis/Northcoders_News_Back_End#setup)
* [Installation](https://github.com/Sinnedennis/Northcoders_News_Back_End#installation)
* [Usage](https://github.com/Sinnedennis/Northcoders_News_Back_End#usage)
* [Endpoints](https://github.com/Sinnedennis/Northcoders_News_Back_End#endpoints)
* [Depenencies](https://github.com/Sinnedennis/Northcoders_News_Back_End#dependencies)
___
### Setup

1. Ensure that your machine is running Node version 7 or above. To check what version you are running, open a terminal window and type:
    ``` 
    node -v
    ```
    If you do not receive a response in the format of v7.2.1, or your version of Node is older than 7x, [click here](https://nodejs.org/en/) to download and install Node from the official website.
   
2. Ensure you have Node Package Manager (NPM) installed. As above, open a terminal window and type:
    ``` 
    npm -v
    ```
    If you do not receive a response in the format of v5.5.1, or your version of NPM is older than 5x, type the following commands into your terminal:
    ``` 
    npm install npm
    ```
    If you run into any issues with the above steps, [click here](https://docs.npmjs.com/getting-started/installing-node) to follow NPM's official guide to installing Node and NPM.

3. Ensure that you have MongoDB installed.To check what version you are running, open a terminal window and type:
    ```
    mongod --version
    ```
    If you do not receive a response in the format of v2.6.12, or your version of MongoDB is older than 2.6, follow this [guide](https://www.mongodb.com/).
___
### Installation

1. Open a terminal window, navigate to the directory where you wish to install this project, and run the following command:
    ```
    git clone https://github.com/Sinnedennis/Northcoders_News_Back_End
    ```
2. Navigate into the freshly-cloned directory and run:
    ```
    npm install
    ```
    In a separate terminal, run the following command to connect to the database. **You must leave this terminal window unhindered to maintain a connection to the database.**
    ```
    mongod
    ```
    then run the following command to populate the databse:
    ```
    node seed/seed.js
    ```
___
## Usage

To start the server run the following command:
```
npm start
```
This will run the server on PORT 3090 and can be accessed at http://localhost:3090. I would recommend [Postman](https://www.getpostman.com/) for making Put, Post, Delete etc requests.

To run the testing suite, type: 
```
npm t
```
___

## Endpoints
|    Description    | URL          |
|:-------------:|:-------------|
|Get all articles         | /api/articles                       |
|Get article by ID        | /api/articles/:article_id           |
|Get comments on article  | /api/articles/:article_id/comments  |
|Put vote on article      | /api/articles/:article_id/          |
|Post comment on article  | /api/articles/:article_id/comments  |
|                         |                                     |
|Put vote on comment      | /api/comments/:comment_id           |
|Delete comment           | /api/comments/:comment_id           | 
|                         |                                     | 
|Get all topics           | /api/topics                         |
|Get articles by topic    | /api/topics/:topic_id/articles      |
|                         |                                     |
|Get all users            | /api/users                          |
|Get user by username     | /api/user/:username                 |
___
## Dependencies
|    Package    | Use          |
|:-------------:|:-------------|
| [supertest](https://github.com/visionmedia/supertest) | HTTP mocking and testing library  |
| [mocha](https://mochajs.org/)                         | Testing environment               |
| [chai](http://chaijs.com/)                            | Assertion library                 |
| [express](https://expressjs.com/)                     | Server library                    |
| [mongoDB](https://www.mongodb.com)                    | MongoDB driver                    |
| [mongoose](http://mongoosejs.com/)                    | MongoDB Object Modelling library  |
