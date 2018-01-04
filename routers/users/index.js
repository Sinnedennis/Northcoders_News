const UserRouter = require('express').Router();
const { getUserByUseName, getAllUsers } = require('../../controllers/users');

UserRouter.get('/', getAllUsers);
UserRouter.get('/:username', getUserByUseName);


module.exports = UserRouter;