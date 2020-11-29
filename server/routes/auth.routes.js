const express = require('express');
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, authController.fetchUser);
router.post('/', authController.login);
router.post('/admin', authController.adminLogin)

module.exports = router;