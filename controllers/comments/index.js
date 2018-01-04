const { Comments } = require('../../models/models');
const { getVoteValue } = require('../utils.js');

function deleteCommentById(req, res) {
  Comments.findByIdAndRemove(req.params.comment_id)
    .then(deletedComment => {
      res.send({ message: 'Comment successfully deleted', deletedComment });
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
      res.send({ message: `Comment ${vote.string}voted!`, wasSuccessful: true, votedData: comment });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 404 });
      next(err);
    })
}

module.exports = { deleteCommentById, putVoteOnComment };