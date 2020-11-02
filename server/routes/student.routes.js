const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

router.get('/', studentController.fetchAll);
router.get('/:studentId', studentController.fetchById);
router.post('/', studentController.create);
router.put('/:studentId', studentController.update);
router.delete('/:studentId', studentController.delete);

module.exports = router;