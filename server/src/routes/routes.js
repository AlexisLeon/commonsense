const router = require('express').Router();
const health = require('../controllers/health');

/* HEALTH */
router.get('/health', health.checkHealth);

module.exports = router;
