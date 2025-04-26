const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const clientRoutes = require('./routes/clientRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');

dotenv.config({ path: '../.env' });
const app = express();

connectDb();

app.use(express.json());
app.use(cors());

app.use('/api', healthRoutes);
app.use('/api', clientRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));