import { pool } from "../config/db.mjs";

export async function createUser(nome, email, senhaHash) {
  const result = await pool.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
    [nome, email, senhaHash]
  );
  return result.rows[0];
}
export async function findByEmail(email) { // Renomeado de findUserByEmail
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return result.rows[0];
}
// Busca um usuário pelo ID, mas retorna apenas os dados seguros
export async function findById(id) {
  const { rows } = await pool.query(
    'SELECT id, nome, email, role FROM usuarios WHERE id = $1',
    [id]
  );
  return rows[0];
}
// Atualiza os dados de um usuário no banco
export async function updateUser(id, nome, email) {
  const { rows } = await pool.query(
    'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email, role',
    [nome, email, id]
  );
  return rows[0];
}

// Atualiza APENAS a senha de um usuário
export async function updatePassword(id, newPasswordHash) {
  const { rows } = await pool.query(
    'UPDATE usuarios SET senha = $1 WHERE id = $2',
    [newPasswordHash, id]
  );
  return { success: true };
}