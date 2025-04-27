const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const authMiddleware = require('../middleware/auth')

router.post('/clients', clientController.registerClient);
router.get('/clients/search', authMiddleware, clientController.searchClients);
router.get('/clients/:id', authMiddleware, clientController.getClientProfile);

module.exports = router;