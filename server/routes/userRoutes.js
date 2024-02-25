const express = require('express');
const { registerController, loginController } = require('../controllers/AuthController');

const router = express.Router();

//login
router.post('/login', loginController);

//register
router.post('/register', registerController);

module.exports = router;