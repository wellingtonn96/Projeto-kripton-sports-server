import { createConnection } from 'mysql';

export const connMysql = () => {
    return createConnection({
        host: '172.17.0.2',
        user: 'root',
        password: 'root',
        database: 'ProjetoOPE'
    });
}
