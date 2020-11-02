const express = require('express');
const lecturerController = require('../controllers/lecturer.controller');

const router = express.Router();

router.get('/', lecturerController.fetchAll);
router.get('/:lecturerId', lecturerController.fetchById);
router.post('/', lecturerController.create);
router.put('/:lecturerId', lecturerController.update);
router.delete('/:lecturerIde', lecturerController.delete);

module.exports = router;