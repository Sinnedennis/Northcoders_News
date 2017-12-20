module.exports = {
  getVoteValue: function (req) {

    let vote = {};

    if (req.query.vote.toLowerCase() === 'up') {
      vote.value = 1;
      vote.string = 'up';

    } else if (req.query.vote.toLowerCase() === 'down') {
      vote.value = -1;
      vote.string = 'down'

    } else {
      vote.value = 0;
      vote.string = 'not ';
    }

    return vote;
  }
};