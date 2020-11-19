const express = require('express');
const milestoneController = require('../controllers/milestone.controller');

const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/permission');

const router = express.Router();

router.get('/', auth, milestoneController.fetchAll);
router.get('/:milestoneId', auth, milestoneController.fetchById);
router.post('/', auth, checkPermission(['LECTURER']), milestoneController.create);
router.put('/:milestoneId', auth, checkPermission(['LECTURER']), milestoneController.update);
router.delete('/:milestoneId', auth, checkPermission(['LECTURER']), milestoneController.delete);

module.exports = router;