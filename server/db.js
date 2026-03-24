const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'bit-academy',
  password: 'bit-academy',
  database: 'middenbeemster_Smidse'
});

module.exports = pool;