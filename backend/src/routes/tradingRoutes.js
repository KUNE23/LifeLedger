const express = require('express');
const router = express.Router();
const tradingController = require('../controllers/tradingControllers');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', tradingController.createTrade);
router.put('/:id', tradingController.updateTrade); 

module.exports = router;