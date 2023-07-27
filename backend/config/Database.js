import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: '172.19.14.118',
    port: 5432,
    database: 'todolist',
    user: 'postgres',
    password: 'admin123',
})

export default pool