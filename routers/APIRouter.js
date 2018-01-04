const TopicRouter = require('./topics');
const ArticleRouter = require('./articles');
const CommentRouter = require('./comments');
const UserRouter = require('./users');

const APIRouter = require('express').Router();

APIRouter.use('/topics', TopicRouter);
APIRouter.use('/articles', ArticleRouter);
APIRouter.use('/comments', CommentRouter);
APIRouter.use('/users', UserRouter);


module.exports = APIRouter; 