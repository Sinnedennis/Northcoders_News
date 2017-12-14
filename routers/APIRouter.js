const { getAllTopics, getArticlesByTopic, getAllArticles, getCommentsByArticle, postCommentByArticle, putVoteOnArticle, deleteCommentById, getUserByUseName , putVoteOnComment, getAllUsers} = require('../controllers/controller.js');
const APIRouter = require('express').Router();

APIRouter.get('/topics', getAllTopics);

APIRouter.get('/topics/:topic_id/articles', getArticlesByTopic);

APIRouter.get('/articles', getAllArticles);
APIRouter.route('/articles/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postCommentByArticle);

APIRouter.put('/articles/:article_id', putVoteOnArticle);

APIRouter.delete('/comments/:comment_id', deleteCommentById);
APIRouter.put('/comments/:comment_id', putVoteOnComment);

APIRouter.get('/users', getAllUsers);
APIRouter.get('/users/:username', getUserByUseName);

module.exports = APIRouter; 