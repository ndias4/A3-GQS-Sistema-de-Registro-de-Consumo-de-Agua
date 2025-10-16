import { pool } from "../config/db.mjs";

export async function createUser(nome, email, senhaHash) {
  const result = await pool.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
    [nome, email, senhaHash]
  );
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return result.rows[0];
}
