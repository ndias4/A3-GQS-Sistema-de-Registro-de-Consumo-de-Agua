import { pool } from "../config/db.js";

export async function registrarConsumo(usuarioId, litros, valorEstimado) {
  const result = await pool.query(
    "INSERT INTO consumos (usuario_id, litros, valor_estimado, data_registro) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [usuarioId, litros, valorEstimado]
  );
  return result.rows[0];
}

export async function listarConsumos(usuarioId) {
  const result = await pool.query(
    "SELECT * FROM consumos WHERE usuario_id = $1 ORDER BY data_registro DESC",
    [usuarioId]
  );
  return result.rows;
}

export async function listarConsumoPorPeriodo(usuarioId, inicio, fim) {
  const result = await pool.query(
    "SELECT * FROM consumos WHERE usuario_id = $1 AND data_registro BETWEEN $2 AND $3 ORDER BY data_registro",
    [usuarioId, inicio, fim]
  );
  return result.rows;
}
