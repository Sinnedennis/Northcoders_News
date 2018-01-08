const { Article, Comment } = require('../../models');
const { getVoteValue } = require('../utils.js');


function getAllArticles(req, res, next) {
  Article.find()
    .then(articles => res.send({ articles }))
    .catch(err => next(err));
}


function getArticleById(req, res, next) {
  const articleId = req.params.article_id;

  Article.findById(articleId)
    .then(article => {
      res.send({ article });
    })
    .catch(err => next(err));
}


function getCommentsByArticle(req, res, next) {
  const articleID = req.params.article_id;

  Comment.find({ belongs_to: articleID })
    .then(comments => res.send({ comments }))
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 400 });
      next(err);
    });
}


function postCommentByArticle(req, res, next) {

  let newComment = new Comment(
    {
      body: String(req.body.commentText),
      belongs_to: req.params.article_id,
      created_by: req.body.created_by,
      created_at: Date.now()
    });

  newComment.save()
    .then((savedComment) => {
      return Comment.findById(savedComment._id);
    })
    .then((insertedComment) => {
      res.send({
        message: 'Comment successfully inserted!',
        comment: insertedComment,
      });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 400 });
      next(err);
    });
}


function putVoteOnArticle(req, res, next) {

  const vote = getVoteValue(req);

  if (vote === false) {
    res.status(400);
    res.send({ message: 'Article not voted.', wasSuccessful: false });
  }

  Article.findByIdAndUpdate(req.params.article_id, { $inc: { votes: vote.value } }, { new: true })
    .then((article) => {
      res.send({ message: `Article ${vote.string}voted!`, wasSuccessful: true, votedData: article });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 400 });
      next(err);
    });
}


module.exports = { getAllArticles, getArticleById, getCommentsByArticle, postCommentByArticle, putVoteOnArticle };