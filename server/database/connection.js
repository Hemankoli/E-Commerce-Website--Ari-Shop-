const mysql = require('mysql2')
require('dotenv').config();


// connect MySql
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: process.env.MYSQL_PORT || 3306,
    });

pool.connect((err) => {
    if (err) {
      console.error('Not Connected', err.message);
      return;
    }
    console.log('Connected to MySQL');
});


module.exports = pool;



