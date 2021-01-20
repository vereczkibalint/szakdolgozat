const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/permission');
const router = express.Router();

router.get('/', auth, checkPermission(['ADMIN']), userController.fetchAll);
router.get('/role/:role', auth, checkPermission(['LECTURER','ADMIN']), userController.fetchByRole);
router.get('/:userId', auth, userController.fetchById);
router.post('/', auth, checkPermission(['ADMIN']), userController.create);
router.post('/import', auth, checkPermission(['LECTURER','ADMIN']), userController.import);
// TODO: change password route
router.put('/:userId', auth, userController.update);
router.delete('/:userId', auth, checkPermission(['ADMIN']), userController.delete);

module.exports = router;
