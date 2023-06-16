const express = require('express');
const requiresAuth = require('../middleware/requiresAuth');
const HomeController = require('../controllers/home.controller');

const router = express.Router();

router.get('/', requiresAuth, HomeController.dashboard);
router.get('/api', requiresAuth, HomeController.sensorData);
router.post('/api',  HomeController.postSensors);
router.get('/:id', requiresAuth, HomeController.greenHouses);
// router.post('/');

module.exports = router;