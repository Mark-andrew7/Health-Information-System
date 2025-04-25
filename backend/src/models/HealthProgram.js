const mongoose = require('mongoose');

const healthProgramSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthProgram', healthProgramSchema);
