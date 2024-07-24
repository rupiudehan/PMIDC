const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'PMIDC'
        });

        console.log('MySQL connected');
        return connection;
    } catch (error) {
        console.error('MySQL connection error, Please make sure the DB is running');
        console.error(error);
        process.exit(1);
    }
}

module.exports = connect;

const mongoose = require('mongoose');


