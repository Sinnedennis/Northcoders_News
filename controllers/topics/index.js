const { Articles, Topics } = require('../../models');

function getAllTopics(req, res, next) {
  Topics.find()
    .then(topics => res.send(topics))
    .catch(err => next(err));
}

function getArticlesByTopic(req, res, next) {
  const topicID = req.params.topic_id;
  Topics.findById(topicID)
    .then(topic => {
      return Articles.find({ belongs_to: topic.slug });
    })
    .then(articles => { res.send(articles); })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    });
}

module.exports = { getAllTopics, getArticlesByTopic };