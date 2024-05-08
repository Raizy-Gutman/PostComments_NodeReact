import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({ path: 'C:/Users/user/project6RaizyGutman/app/config/.env' })

const password=process.env.MYSQL_PASSWORD;
const database= process.env.MYSQL_DATABASE;

console.log(password,database)

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST||"localhost",
    user: process.env.MYSQL_USER||"root",
    password: process.env.MYSQL_PASSWORD||"m789456",
    database: process.env.MYSQL_DATABASE||"mysqldb"
}).promise();

// import mysql from 'mysql2';
// import { variables } from '../config/variables.js';

// const password=variables.password;
// const database= variables.database;

// console.log(password,database)

// export const pool = mysql.createPool({
//     host: variables.host,
//     user: variables.user,
//     password: variables.password,
//     database: variables.database
// }).promise();
