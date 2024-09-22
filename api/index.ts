import express from 'express';
import AuthMiddleware from './src/AuthMiddleware';
import { parameterRouterConfig, versionRouterConfig } from './src/routes';

const app = express();
app.use(express.json());
const routes = express.Router();

versionRouterConfig(routes);
parameterRouterConfig(routes);

app.use('/api', AuthMiddleware, routes);

export default app;