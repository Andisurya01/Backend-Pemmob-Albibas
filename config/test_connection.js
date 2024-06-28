// // const pool = require('./database.js');
// require("dotenv").config();
// const mysql = require("mysql2/promise");

// // console.log(process.env.MYSQL_HOST);
// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DATABASE,
//   password: process.env.MYSQL_PASSWORD,
//   port: process.env.MYSQL_PORT,
// });
// console.log(pool);
// console.log('Creating connection pool...');
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error acquiring client', err.stack);
//   } else {
//     console.log('Connection successful');
//     connection.release(); // Melepaskan koneksi kembali ke pool
//   }
// });