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