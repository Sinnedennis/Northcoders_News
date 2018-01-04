const { Article, Topic } = require('../../models');

function getAllTopics(req, res, next) {
  Topic.find()
    .then(topics => res.send(topics))
    .catch(err => next(err));
}

function getArticlesByTopic(req, res, next) {
  const topicID = req.params.topic_id;
  Topic.findById(topicID)
    .then(topic => {
      return Article.find({ belongs_to: topic.slug });
    })
    .then(articles => { res.send(articles); })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    });
}

module.exports = { getAllTopics, getArticlesByTopic };