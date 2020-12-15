import express from 'express';
import { connection } from './database/dbConnection';
import routes from './routes';

const app = express();

connection().connect(err => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }

  return console.log('Connected to the mysql server');
});

app.use(express.json());

app.use(routes);

export default app;
