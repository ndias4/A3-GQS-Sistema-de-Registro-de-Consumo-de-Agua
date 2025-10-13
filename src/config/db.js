import pkg from "pg";
import dotenv from "dotenv";

// Verificamos se estamos no ambiente de teste (definido pelo comando 'npm test')
if (process.env.NODE_ENV === 'test') {
    // Se sim, carregamos as variáveis do banco de TESTE
    dotenv.config({ path: '.env.test' });
} else {
    // Senão, carregamos as variáveis do banco de DESENVOLVIMENTO
    dotenv.config();
}

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, 
  port: process.env.DB_PORT,
});
