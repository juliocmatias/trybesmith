import express from 'express';
import { productsRouter, usersRouter, loginRouter } from './routers';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

export default app;
