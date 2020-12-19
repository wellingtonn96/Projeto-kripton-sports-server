import { Connection, createConnection } from 'mysql';

export const connection = (): Connection =>
  createConnection({
    host: '172.17.0.2',
    user: 'root',
    password: 'root',
    database: 'projetoOPE',
  });
