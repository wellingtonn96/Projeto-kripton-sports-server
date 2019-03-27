var mysql = require('mysql');

var connMysql= function(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'projetoOPE'
    });

}

module.exports = function(){
    return connMysql;
}