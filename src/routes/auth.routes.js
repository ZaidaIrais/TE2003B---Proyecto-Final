const express = require('express');
const AuthController = require('../controllers/auth.contoller');

const router = express.Router();

router.get('/login', AuthController.login);
router.post('/login', AuthController.logUser);
router.get('/signup', AuthController.signup);
router.post('/signup', AuthController.signUser);
router.get('/logout', AuthController.logout);

module.exports = router;