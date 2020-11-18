const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.fetchAll);
router.get('/:role', userController.fetchByRole);
router.get('/:userId', userController.fetchById);
router.post('/', userController.create);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;