// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'PMIDC'
// });

// const Country = {
//     create: async function(name, id) {
//         const sql = 'INSERT INTO Countries (id, name) VALUES (?, ?)';
//         const [result] = await connection.execute(sql, [id, name]);
//         return result.insertId;
//     },
//     getAll: async function() {
//         const sql = 'SELECT * FROM Countries';
//         const [results] = await connection.execute(sql);
//         return results;
//     },
//     update: async function(id, name) {
//         const sql = 'UPDATE Countries SET name = ? WHERE id = ?';
//         const [result] = await connection.execute(sql, [name, id]);
//         return result.affectedRows > 0;
//     },
//     delete: async function(id) {
//         const sql = 'DELETE FROM Countries WHERE id = ?';
//         const [result] = await connection.execute(sql, [id]);
//         return result.affectedRows > 0;
//     }
// };

// module.exports = Country;
