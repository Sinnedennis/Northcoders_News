# Northcoders News BE

This project was written as a back-end to support a reddit style news website front-end using [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

You will need to have Node v7 and above installed on your system. To check if you have it installed type the following command in your terminal which will return your version.

```
node -v
```
You will also need to check that npm is installed along with node. To check type the following
```
npm -v
```
If you do not have node or npm installed, follow this [guide](https://nodejs.org/en/download/package-manager/).

You will need MongoDB installed and running in a terminal when using the API. To run in your terminal, type this command
```
mongod
```
If you do not have MongoDB installed, follow this [guide](https://www.mongodb.com/).

You will also need git installed on your machine. To check that you have it installed type the following command
```
git --version
```
If you do not have it installed follow this [guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Installing

In order to install this project make sure you are in a directory you wish to install in your terminal and run the following command
```
git clone https://github.com/Sinnedennis/Northcoders_News_Back_End
```
then navigate into the folder and run
```
npm install
```
In a separate terminal run the following command to connect to the database and keep it running when running the server
```
mongod
```
then to populate the databse run 
```
node seed/seed.js
```
## Running the server

To start the server run the following command
```
npm start
```
This will run the server on PORT 3090 and can be accessed at htttp://localhost:3090 which will display a page with all the available routes.

If you wish to use a hosted MongoDB from [mlab](https://mlab.com/), you will need to change the dev database url in config.js and create a .env file in the root of the folder with the following contents
```
USERNAME=<username here>
PASSWORD=<password here>
```
## Running the tests

To run the tests enter the following command 
```
npm t
```
Testing was done using supertest, mocha and chai through a Test Driven Development approach.


## Built With
* [supertest](https://github.com/visionmedia/supertest)
* [mocha](https://mochajs.org/)
* [chai](http://chaijs.com/)
* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com)
* [mongoose](http://mongoosejs.com/)

## Author

[Dennis Foster](https://github.com/Sinnedennis)
