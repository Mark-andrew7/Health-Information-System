const HealthProgram = require('./models/HealthProgram');

exports.createProgram = async(req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({error: "Name is required"});
    try {
        const program = new HealthProgram({ name, description });
        await HealthProgram.save();
        res.status(201).json(program);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};