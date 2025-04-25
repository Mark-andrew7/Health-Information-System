const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');

router.post('/clients', clientController.registerClient);

module.exports = router;