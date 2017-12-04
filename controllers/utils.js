module.exports = {
  getVoteValue: function (req) {
    let vote = {};
    if (req.query.vote.toLowerCase() === 'up') vote.value = 1;
    else if (req.query.vote.toLowerCase() === 'down') vote.value = -1;
    else vote.value = 0;

    vote.string = req.query.vote.toLowerCase() || 'not';

    return vote;
  }
};