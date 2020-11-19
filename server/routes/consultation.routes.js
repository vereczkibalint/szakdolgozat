const express = require('express');
const consultationController = require('../controllers/consultation.controller');

const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/permission');

const router = express.Router();

router.get('/', auth, consultationController.fetchAll);
router.get('/reservations', auth, consultationController.fetchReservations);
router.get('/reservations/:reservationId', auth, consultationController.fetchReservationsById);
router.get('/:consultationId', auth, consultationController.fetchById); /* student egyezzen a req.user.id-vel */
router.post('/', auth, checkPermission(['LECTURER']), consultationController.create);
router.post('/reserve', auth, checkPermission(['STUDENT']), consultationController.reserve);
router.post('/cancel', auth, checkPermission(['STUDENT']), consultationController.cancel);
router.put('/:consultationId', auth, checkPermission(['LECTURER']),consultationController.update);
router.delete('/:consultationId', checkPermission(['LECTURER']),consultationController.delete);

module.exports = router;