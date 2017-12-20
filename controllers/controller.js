const { Articles, Comments, Topics, Users } = require('../models/models');
const { getVoteValue } = require('./utils.js');

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

function getAllArticles(req, res, next) {
  Articles.find()
    .then(articles => res.send({ articles }))
    .catch(err => next(err));
}

function getArticleById(req, res, next) {
  const articleId = req.params.article_id;

  Articles.findById(articleId)
    .then(article => {
      res.send({ article })
    })
    .catch(err => next(err));
}

function getCommentsByArticle(req, res, next) {
  const articleID = req.params.article_id;
  Comments.find({ belongs_to: articleID })
    .then(comments => res.send({ comments }))
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    });
}

function postCommentByArticle(req, res, next) {
  new Comments(
    {
      body: req.body.comment,
      belongs_to: req.params.article_id
    })
    .save()
    .then(() => {
      return Comments.find({ body: req.body.comment, belongs_to: req.params.article_id });
    })
    .then((insertedComment) => {
      res.send({
        message: 'Comment successfully inserted!',
        comment: insertedComment[0],
      });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    });
}

function putVoteOnArticle(req, res, next) {

  const vote = getVoteValue(req);

  if (vote === false) {
    res.status(400);
    res.send({ message: `Article not voted.`, wasSuccessful: false })
  }

  Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: vote.value } }, { new: true })
    .then((article) => {
      res.send({ message: `Article ${vote.string}voted!`, wasSuccessful: true, data: article });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    });
}

function deleteCommentById(req, res) {
  Comments.findByIdAndRemove(req.params.comment_id)
    .then(deletedComment => {
      res.send({ message: 'Comment successfully deleted', deletedComment });
    });
}

function getUserByUseName(req, res, next) {
  Users.find({ username: req.params.username })
    .then(user => {
      res.send(user[0]);
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    });
}

function getAllUsers (req, res, next) {
  Users.find()
  .then(users => {
    res.send(users);
  })
  .catch(err => {
    if (err.name === 'CastError') return next({ err, type: 404 });
    next(err);
  });
}

function putVoteOnComment(req, res, next) {

  const vote = getVoteValue(req);

  if (vote === false) {
    res.status(400);
    res.send({ message: `Article not voted.`, wasSuccessful: false })
  }

  Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: vote.value } }, { new: true })
    .then((comment) => {
      res.send({ message: `Comment ${vote.string}voted!`, wasSuccessful: false, data: comment });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    })
}

module.exports = { getAllTopics, getArticlesByTopic, getAllArticles, getCommentsByArticle, postCommentByArticle, putVoteOnArticle, deleteCommentById, getUserByUseName, getAllUsers, putVoteOnComment, getArticleById };