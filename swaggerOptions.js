const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Daily Journal API",
            version: "1.0.0",
            description: "API for Records Management",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ],
    },
    apis: ["./routes/*.js"], // path to files with Swagger annotations
};

const swaggerSpecs = swaggerJsdoc(options);
module.exports = swaggerSpecs;
