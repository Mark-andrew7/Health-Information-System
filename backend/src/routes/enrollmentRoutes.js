const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment');

router.post('/enrollments', enrollmentController.enrollClient);

module.exports = router;