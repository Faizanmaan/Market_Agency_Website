const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

router.post('/', validateContact, submitContact);
router.get('/', getContacts);

module.exports = router;
