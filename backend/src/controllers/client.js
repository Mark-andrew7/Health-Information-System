const Client = require('../models/Client');

exports.registerClient = async(req, res) => {
    const { firstName, lastName, dateOfBirth, gender, contact } = req.body;
    if (!firstName || !lastName || !dateOfBirth || !gender || !contact) {
        return res.status(400).json({ error: "All fields are required" })
    }
    try {
        const client = new Client({ firstName, lastName, dateOfBirth, gender, contact })
        await client.save();
        res.status(201).json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};