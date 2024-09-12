require('dotenv').config();
const express = require('express');
const entryRoutes = require('./routes/entry');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerOptions');

const app = express();
app.use(express.json());

app.use('/entry', entryRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Use swagger to test: http://localhost:3000/api-docs");
});
