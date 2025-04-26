const Client = require('../models/Client');
const sanitize = require('mongo-sanitize');
const Enrollment = require('../models/Enrollment');
const mongoose = require('mongoose');
const HealthProgram = require('../models/HealthProgram');

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

exports.searchClients = async(req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
    const sanitizedQuery = sanitize(query || '');
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    try {
        let searchCriteria = {};
        if (sanitizedQuery) {
            if (mongoose.Types.ObjectId.isValid(sanitizedQuery)) {
                searchCriteria = { _id: sanitizedQuery };
            } else {
                searchCriteria = { $text: { $search: sanitizedQuery } };
            }
        }

        const clients = await Client.find(searchCriteria)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .select('firstName lastName contact');

        const total = await Client.countDocuments(searchCriteria)

        res.json({
            clients,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum)
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getClientProfile = async(req, res) => {
    const clientId = sanitize(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).json({ error: "Client not found" });
    }

    try {
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ error: "Client not found" })
        }

        const enrollments = await Enrollment.find({ clientId })
            .populate('programId', 'name description')
            .select('programId enrolledAt');
        
        res.json({
            client: {
                _id: client._id,
                firstName: client.firstName,
                lastName: client.lastName,
                dateOfBirth: client.dateOfBirth,
                gender: client.gender,
                contact: client.contact
            },
            enrollments
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};