const express = require('express');
const thesisController = require('../controllers/thesis.controller');

const router = express.Router();

router.get('/', thesisController.fetchAll);
router.get('/:thesisId', thesisController.fetchById);
router.post('/', thesisController.create);
router.put('/:thesisId', thesisController.update);
router.delete('/:thesisId', thesisController.delete);

module.exports = router;