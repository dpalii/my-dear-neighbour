const express = require('express');

const groupController = require('../controllers/groupController');
const authorize = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/groups', authorize, groupController.getGroups);

module.exports = router;