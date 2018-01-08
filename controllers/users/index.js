const { User } = require('../../models');

function getUserByUseName(req, res, next) {
  User.find({ username: req.params.username })
    .then(user => {
      res.send(user[0]);
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 400 });
      next(err);
    });
}

function getAllUsers(req, res, next) {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ err, type: 400 });
      next(err);
    });
}

module.exports = { getUserByUseName, getAllUsers };