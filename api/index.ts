import express from 'express';
import cors from 'cors';
import AuthMiddleware from './src/AuthMiddleware';
import { parameterRouterConfig, versionRouterConfig } from './src/routes';
import dotenv from 'dotenv';

dotenv.config();
const corsOptions = {
    origin: process.env.CLIENT_URL!.split(','),
    optionsSuccessStatus: 200,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const routes = express.Router();

versionRouterConfig(routes);
parameterRouterConfig(routes);

app.use('/api', AuthMiddleware, routes);

export default app;