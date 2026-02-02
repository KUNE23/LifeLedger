const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);
router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);

module.exports = router;