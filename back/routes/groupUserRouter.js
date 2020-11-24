const express = require('express');

const router = express.Router();

const groupUserController = require('../controllers/groupUserController');
const authorize = require('../middlewares/authMiddleware');
const checkGroupUser = require('../middlewares/checkGroupUser');
const checkGroupAdmin = require('../middlewares/checkGroupAdmin');

router.post('/groups/:groupId/users', authorize, groupUserController.createGroupUser);
router.get('/groups/:groupId/users', authorize, checkGroupUser, groupUserController.getGroupUsers);
router.get('/groups/:groupId/users/:userId', authorize, checkGroupUser, groupUserController.getGroupUserById);
router.patch('/groups/:groupId/users/:userId', authorize, checkGroupAdmin, groupUserController.updateUserAccess);

module.exports = router;