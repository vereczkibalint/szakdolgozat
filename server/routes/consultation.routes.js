const express = require('express');
const consultationController = require('../controllers/consultation.controller');

const router = express.Router();

router.get('/', consultationController.fetchAll);
router.get('/:consultationId', consultationController.fetchById);
router.post('/', consultationController.create);
router.put('/:consultationId', consultationController.update);
router.delete('/:consultationId', consultationController.delete);

module.exports = router;