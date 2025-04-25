const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthProgram', required: true },
    enrolledAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Enrollment', enrollmentSchema);