const express = require('express');
const milestoneController = require('../controllers/milestone.controller');

const router = express.Router();

router.get('/', milestoneController.fetchAll);
router.get('/:milestoneId', milestoneController.fetchById);
router.post('/', milestoneController.create);
router.put('/:milestoneId', milestoneController.update);
router.delete('/:milestoneId', milestoneController.delete);

module.exports = router;