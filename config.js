require('dotenv').config();
const {USERNAME, PASSWORD} = process.env;
console.log(USERNAME, PASSWORD);

module.exports = {
  DB: {
    test: 'mongodb://localhost/northcoders-news-api-test',
    dev: `mongodb://${USERNAME}:${PASSWORD}@ds135916.mlab.com:35916/nc_news_test`
  },
  PORT: {
    test: 3090,
    dev: 3000
  }
};