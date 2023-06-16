const express = require('express');
const { homePage } = require('../controllers/home.controller')

const router = express.Router();

router.get('/', homePage);
// router.post('/');

module.exports = router;