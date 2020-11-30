const router = require('express').Router();

// Import controller
const { 
  subscribeController,
  publishController,
  eventController
} = require('../controllers/app.controller');

router.post('/subscribe/:topic', subscribeController);
router.post('/publish/:topic', publishController);
router.post('/event', eventController);

module.exports = router;