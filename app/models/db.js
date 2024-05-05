import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: "../config/.env" });

export const pool = mysql.createPool({
    host: process.env.NYSQL_HOST,
    user: process.env.NYSQL_USER,
    password: process.env.NYSQL_PASSWORD,
    database: process.env.NYSQL_DATABASE
}).promise();

