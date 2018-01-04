// const { putVoteOnArticle, deleteCommentById, getUserByUseName , putVoteOnComment, getAllUsers } = require('../controllers/controller.js');

const { getAllTopics, getArticlesByTopic } = require('../controllers/topics');
const { getAllArticles, getArticleById, getCommentsByArticle, postCommentByArticle, putVoteOnArticle } = require('../controllers/articles');
const { deleteCommentById, putVoteOnComment } = require('../controllers/comments');
const { getUserByUseName, getAllUsers } = require('../controllers/users');
const APIRouter = require('express').Router();

APIRouter.get('/topics', getAllTopics);
APIRouter.get('/topics/:topic_id/articles', getArticlesByTopic);


APIRouter.get('/articles', getAllArticles);
APIRouter.get('/articles/:article_id', getArticleById);
APIRouter.route('/articles/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postCommentByArticle);
APIRouter.put('/articles/:article_id', putVoteOnArticle);


APIRouter.delete('/comments/:comment_id', deleteCommentById);
APIRouter.put('/comments/:comment_id', putVoteOnComment);


APIRouter.get('/users', getAllUsers);
APIRouter.get('/users/:username', getUserByUseName);

module.exports = APIRouter; 