import mysql2 from 'mysql2/promise';

const database = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tabungin',
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

database
  .getConnection()
  .then(() => console.log('Connected to MySQL Database!'))
  .catch((err) => console.error(`Connection to database FAILED! ${err}`));

export default database;
