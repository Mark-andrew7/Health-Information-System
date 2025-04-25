const Enrollment = require('../models/Enrollment');

exports.enrollClient = async(req, res) => {
    const { clientId, programId } = req.body;
    if (!clientId || !programId) {
        return res.status(400).json({ error: "Client ID and program ID required" });
    }
    try {
        const enrollment = new Enrollment({ clientId, programId });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};