const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: [ 'Male', 'Female', 'Other' ], required: true },
    contact: { type: String, required: true }
});

clientSchema.index({ firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('Client', clientSchema);