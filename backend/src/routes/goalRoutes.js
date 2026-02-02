const router = require('express').Router();
const goalController = require('../controllers/goalControllers');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', goalController.getGoals);
router.post('/', goalController.createGoal);
router.patch('/:id/progress', goalController.updateProgress);

module.exports = router;