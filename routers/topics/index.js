const TopicRouter = require('express').Router();
const { getAllTopics, getArticlesByTopic } = require('../../controllers/topics');

TopicRouter.get('/', getAllTopics);
TopicRouter.get('/:topic_id/articles', getArticlesByTopic);


module.exports = TopicRouter;