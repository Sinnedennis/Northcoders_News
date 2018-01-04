const CommentRouter = require('express').Router();
const { deleteCommentById, putVoteOnComment } = require('../../controllers/comments');

CommentRouter.delete('/:comment_id', deleteCommentById);
CommentRouter.put('/:comment_id', putVoteOnComment);


module.exports = CommentRouter;