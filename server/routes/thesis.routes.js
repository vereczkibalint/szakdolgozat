const express = require('express');
const thesisController = require('../controllers/thesis.controller');

const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/permission');

const router = express.Router();

router.get('/', auth, thesisController.fetchAll);
router.get('/:thesisId', auth, thesisController.fetchById);
router.post('/', auth, checkPermission(['LECTURER', 'ADMIN']), thesisController.create);
router.put('/:thesisId', auth, checkPermission(['LECTURER', 'ADMIN']), thesisController.update);
router.delete('/:thesisId', auth, checkPermission(['LECTURER', 'ADMIN']), thesisController.delete);

module.exports = router;