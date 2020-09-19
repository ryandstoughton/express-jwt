const swaggerJsdoc = require('swagger-jsdoc');
const packageJson = require('../package.json');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: packageJson.name,
            version: packageJson.version,
            description: packageJson.description,
            license: {
                name: packageJson.license,
                url: "https://choosealicense.com/licenses/isc/"
            },
            contact: {
                name: "Swagger",
                url: "https://swagger.io",
                email: "Info@SmartBear.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: ["./routes/auth.js"]
};
const specs = swaggerJsdoc(options);

module.exports = specs;
