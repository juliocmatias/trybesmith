import express from 'express';
import SwaggerUI from 'swagger-ui-express';
import swaggerJSON from './swagger.json';
import { productsRouter, usersRouter, loginRouter } from './routers';

const app = express();

app.use('/api-doc', SwaggerUI.serve, SwaggerUI.setup(swaggerJSON));

app.use(express.json());
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

export default app;
