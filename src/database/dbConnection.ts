import { createConnection } from 'mysql';

export const connection = () =>
  createConnection({
    host: '172.17.0.2',
    user: 'root',
    password: 'root',
    database: 'projetoOPE',
  });
