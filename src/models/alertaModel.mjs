// src/models/alertaModel.js
import { pool } from '../config/db.mjs';

/**
 * Lista todos os alertas de um usuário específico,
 * ordenando pelos mais recentes primeiro.
 */
export async function listarPorUsuario(usuarioId) {
    const query = `
        SELECT * FROM alertas 
        WHERE "usuarioId" = $1 
        ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query, [usuarioId]);
    return rows;
}

/**
 * Atualiza o status de um alerta para 'lido'.
 * Garante que um usuário só pode marcar seus próprios alertas.
 */
export async function marcarComoLido(alertaId, usuarioId) {
    const query = `
        UPDATE alertas 
        SET lido = TRUE 
        WHERE id = $1 AND "usuarioId" = $2 
        RETURNING *
    `;
    const { rows } = await pool.query(query, [alertaId, usuarioId]);
    return rows[0];
}

// Deleta TODOS os alertas de um usuário específico
export async function limparPorUsuario(usuarioId) {
    const { rows } = await pool.query(
      'DELETE FROM alertas WHERE "usuarioId" = $1',
      [usuarioId]
    );
    // DELETE não retorna 'rows' por padrão, a menos que usemos RETURNING,
    // mas para esta operação, só precisamos saber que executou.
    return { success: true };
}