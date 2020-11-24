const express = require('express');

const voteController = require('../controllers/voteController');
const authorize = require('../middlewares/authMiddleware');
const checkGroupUser = require('../middlewares/checkGroupUser');

const router = express.Router();

router.post('/groups/:groupId/posts/:postId/vote', authorize, checkGroupUser, voteController.createVote);

module.exports = router;