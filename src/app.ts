import express from 'express';
import upload from './config/upload';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use('/files', express.static(upload.directory));

export default app;
