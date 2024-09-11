require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const entryRoutes = require('./routes/entry');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerOptions');

const app = express();

app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@clustery.ueih4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterY`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB:", err));


app.use('/entry', entryRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Use swagger to test: http://localhost:3000/api-docs");
});
