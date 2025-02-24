
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: '127.0.0.1', 
    database: process.env.DB_NAME || 'appinv_db',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

pool.connect()
    .then(() => console.log('Conexão ao banco bem-sucedida'))
    .catch((err) => console.error('Falha na conexão ao banco:', err));

export default pool;
