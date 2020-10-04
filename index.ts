// Express Imports
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
// Swagger Imports
import swaggerUi from 'swagger-ui-express';
import specs from './routes/swagger';
// Route Imports
import authRoutes from './routes/auth';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes)
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(specs, {explorer: true}));
app.get('/', (req: Request, res: Response) => {
  res.json({test: 'test'})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});



