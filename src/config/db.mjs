import pkg from "pg";
import dotenv from "dotenv";

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  // ADICIONE ESTA LINHA PARA ATIVAR O SSL
  ssl: {
    rejectUnauthorized: false
  }
});