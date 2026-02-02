const router = require('express').Router();
const projectController = require('../controllers/projectControllers');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
router.post('/todo', projectController.addTodo);
router.patch('/todo/:id', projectController.toggleTodo);

module.exports = router;