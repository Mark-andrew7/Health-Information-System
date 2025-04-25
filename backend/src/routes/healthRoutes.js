const express = require('express');
const router = express.Router();
const healthProgramController = require('../controllers/healthProgram');

router.post('/programs', healthProgramController.createProgram);

module.exports = router;