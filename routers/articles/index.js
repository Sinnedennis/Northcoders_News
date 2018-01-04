const ArticleRouter = require('express').Router();

const {
  getAllArticles,
  getArticleById,
  getCommentsByArticle,
  postCommentByArticle,
  putVoteOnArticle
      } = require('../../controllers/articles');


ArticleRouter.get('/', getAllArticles);

ArticleRouter.route('/:article_id')
  .get(getArticleById)
  .put(putVoteOnArticle);

ArticleRouter.route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postCommentByArticle);


module.exports = ArticleRouter;