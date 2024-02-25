const express = require('express');
const { registerController, loginController, profileController } = require('../controllers/AuthController');

const router = express.Router();

//login
router.post('/login', loginController);

//register
router.post('/register', registerController);

//profile
router.post('/profile', profileController);

module.exports = router;