const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');

dotenv.config();
const app = express();

connectDb();

app.use(express.json());
app.use(cors());

app.use('/api', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));