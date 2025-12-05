const express = require('express');
const router = express.Router();
const { subscribe, unsubscribe, getSubscribers } = require('../controllers/newsletterController');
const { validateEmail } = require('../middleware/validation');

router.post('/subscribe', validateEmail, subscribe);
router.post('/unsubscribe', validateEmail, unsubscribe);
router.get('/', getSubscribers);

module.exports = router;
