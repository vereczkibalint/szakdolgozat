const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, userController.fetchAll);
router.get('/:role', auth, userController.fetchByRole);
router.get('/:userId', auth, userController.fetchById);
router.post('/', auth, userController.create);
router.put('/:userId', auth, userController.update);
router.delete('/:userId', auth, userController.delete);

module.exports = router;