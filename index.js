// Express Imports
const express = require('express');
const bodyParser = require('body-parser');
// Swagger Imports
const swaggerUi = require('swagger-ui-express');
const specs = require('./routes/swagger');
// Route Imports
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes)
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(specs, { explorer: true }));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});



