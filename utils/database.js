const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'encode_prueba',
    password: '',
});

module.exports = pool.promise();
