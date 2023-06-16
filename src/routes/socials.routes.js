const express = require('express');

const router = express.Router();

router.get('/about');
router.get('/product');
router.get('/contact');

module.exports = router;