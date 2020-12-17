const express = require('express');

const voteController = require('../controllers/voteController');
const authorize = require('../middlewares/authMiddleware');
const checkGroupUser = require('../middlewares/checkGroupUser');

const router = express.Router();

router.post('/groups/:groupId/posts/:postId/vote', authorize, checkGroupUser, voteController.createVote);
router.get('/groups/:groupId/posts/:postId/vote', authorize, checkGroupUser, voteController.getVote);
router.delete('/groups/:groupId/posts/:postId/vote', authorize, checkGroupUser, voteController.deleteVote);

module.exports = router;