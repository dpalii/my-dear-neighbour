const express = require('express');

const userController = require('../controllers/userController');
const authorize = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users/me', authorize, userController.getMe);
router.get('/users/me/groups', authorize, userController.getMyGroups);
router.delete('/users/me', authorize, userController.deleteMe);
router.patch('/users/me', authorize, userController.changePassword);
router.put('/users/me', authorize, userController.updateProfile);

module.exports = router;