const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeControllers');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', financeController.getAllLogs);
router.post('/', financeController.createLog);
router.delete('/:id', financeController.deleteLog);

module.exports = router;