const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',   // 👈 belangrijk!
  user: 'bit_academy',
  password: 'bit_academy',
  database: 'middenbeemster_Smidse',
  connectionLimit: 10
});

module.exports = pool;