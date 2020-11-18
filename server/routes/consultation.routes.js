const express = require('express');
const consultationController = require('../controllers/consultation.controller');

const router = express.Router();

router.get('/', consultationController.fetchAll);
router.get('/reservations', consultationController.fetchReservations);
router.get('/reservations/:reservationId', consultationController.fetchReservationsById);
router.get('/:consultationId', consultationController.fetchById);
router.post('/', consultationController.create);
router.post('/reserve', consultationController.reserve);
router.post('/cancel', consultationController.cancel);
router.put('/:consultationId', consultationController.update);
router.delete('/:consultationId', consultationController.delete);

module.exports = router;