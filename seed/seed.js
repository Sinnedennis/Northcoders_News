const models = require('../models');
const userData = require('./data/user_data.js');
const articleData = require('./data/articles');
const Chance = require('chance');
const chance = new Chance();
const _ = require('underscore');
const async = require('async');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const moment = require('moment');
const DBs = require('../config').DB;


mongoose.connect(DBs.dev, { useMongoClient: true })
  .then(() => {
    console.log(`connected to database ${DBs.dev}`); // eslint-disable-line
    mongoose.connection.db.dropDatabase();
    async.waterfall([
      addUsers,
      addTopics,
      addArticles,
      addComments,
      addNorthcoderUser
    ], function (err) {
      if (err) {
        console.log('ERROR SEEDING :O'); // eslint-disable-line
        console.log(JSON.stringify(err)); // eslint-disable-line
        process.exit();
      }
      console.log('DONE SEEDING!!'); // eslint-disable-line
      process.exit();
    });
  })
  .catch(err => {
    console.log('DB ERROR'); // eslint-disable-line
    console.log(JSON.stringify(err)); // eslint-disable-line
    process.exit();
  });


function addNorthcoderUser(done) {
  const userDoc = new models.Users(
    {
      username: 'northcoder',
      name: 'Awesome Northcoder',
      avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200'
    }
  );
  userDoc.save(function (err) {
    if (err) {
      return done(err);
    }
    return done();
  });
}

function addUsers(done) {
  console.log('adding users');
  async.eachSeries(userData, function (user, cb) {
    const userDoc = new models.Users(user);
    userDoc.save(function (err) {
      if (err) {
        return cb(err);
      }
      return cb();
    });
  }, function (error) {
    if (error) return done(error);
    return done(null);
  });
}

function addTopics(done) {
  console.log('adding topics');
  let topicDocs = [];
  async.eachSeries(['Football', 'Cooking', 'Coding'], function (topic, cb) {
    const topicObj = {
      title: topic,
      slug: topic.toLowerCase()
    };
    const topicDoc = new models.Topics(topicObj);
    topicDoc.save(function (err, doc) {
      if (err) {
        console.log(JSON.stringify(err));
        return cb(err);
      }
      console.log(JSON.stringify(doc));
      topicDocs.push(topicObj);
      return cb();
    });
  }, function (error) {
    if (error) return done(error);
    return done(null, topicDocs);
  });
}

function addArticles(topicDocs, done) {
  console.log('adding articles');
  // will be a big array of strings
  let docIds = [];
  async.eachSeries(topicDocs, function (topic, cb) {
    const articles = articleData[topic.slug];
    async.eachSeries(userData, function (user, cbTwo) {
      const usersArticle = articles[0];
      usersArticle.created_by = user.username;
      usersArticle.belongs_to = topic.slug;
      usersArticle.votes = _.sample(_.range(2, 11));
      const usersArticleDoc = new models.Articles(usersArticle);
      usersArticleDoc.save(function (err, doc) {
        if (err) {
          console.log(JSON.stringify(err));
          return cb(err);
        }
        articles.shift();
        docIds.push(doc._id);
        const usersArticleTwo = articles[0];
        usersArticleTwo.created_by = user.username;
        usersArticleTwo.belongs_to = topic.slug;
        usersArticleTwo.votes = _.sample(_.range(2, 11));
        const usersArticleTwoDoc = new models.Articles(usersArticleTwo);
        usersArticleTwoDoc.save(function (err, doc2) {
          if (err) {
            console.log(JSON.stringify(err));
            return cb(err);
          }
          articles.shift();
          docIds.push(doc2._id);
          return cbTwo();
        });
      });
    }, function (error) {
      if (error) return cb(error);
      return cb(null, docIds);
    });

  }, function (error) {
    if (error) return done(error);
    return done(null, docIds);
  });
}

function addComments(docIds, done) {
  console.log('adding comments');
  async.eachSeries(docIds, function (id, cb) {
    async.eachSeries(_.range(_.sample(_.range(5, 11))), function (x, cbTwo) {
      const comment = {
        body: chance.paragraph({ sentences: _.sample(_.range(2, 5)) }),
        belongs_to: id,
        created_by: userData[_.sample(_.range(6))].username,
        votes: _.sample(_.range(2, 11)),
        created_at: getRandomStamp()
      };
      const commentDoc = new models.Comments(comment);
      commentDoc.save(function (err) {
        if (err) {
          return cb(err);
        }
        return cbTwo();
      });
    }, function (error) {
      if (error) return done(error);
      return cb();
    });

  }, function (err) {
    if (err) return done(err);
    return done();
  });
}

function getRandomStamp() {
  return new Date(
    moment().subtract(_.sample(_.range(1, 7)), 'days')
      .subtract(_.sample(_.range(1, 24)), 'hours')
      .subtract(_.sample(_.range(1, 60)), 'minutes')
      .format()
  ).getTime();
}
