const express = require('express');

const postController = require('../controllers/postController');
const authorize = require('../middlewares/authMiddleware');
const checkGroupUser = require('../middlewares/checkGroupUser');
const checkGroupAdmin = require('../middlewares/checkGroupAdmin');

const router = express.Router();

router.post('/groups/:groupId/posts', authorize, checkGroupUser, postController.createGroupPost);
router.get('/groups/:groupId/posts', authorize, checkGroupUser, postController.getGroupPosts);
router.get('/groups/:groupId/posts/:postId', authorize, checkGroupUser, postController.getGroupPostById);
router.put('/groups/:groupId/posts/:postId', authorize, checkGroupUser, postController.updateGroupPostById);
router.patch('/groups/:groupId/posts/:postId', authorize, checkGroupAdmin, postController.confirmPostById);
router.delete('/groups/:groupId/posts/:postId', authorize, checkGroupUser, postController.deletePost);

module.exports = router;