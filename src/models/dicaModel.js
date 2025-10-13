import { pool } from '../config/db.js';

// Lista todas as dicas do banco
export async function listar() {
    const { rows } = await pool.query('SELECT * FROM dicas ORDER BY id ASC');
    return rows;
}

// Cria uma nova dica no banco
export async function criar(titulo, descricao, impacto) {
    const { rows } = await pool.query(
        'INSERT INTO dicas (titulo, descricao, impacto) VALUES ($1, $2, $3) RETURNING *',
        [titulo, descricao, impacto]
    );
    return rows[0];
}

// Atualiza uma dica existente
export async function atualizar(id, titulo, descricao, impacto) {
    const { rows } = await pool.query(
        'UPDATE dicas SET titulo = $1, descricao = $2, impacto = $3 WHERE id = $4 RETURNING *',
        [titulo, descricao, impacto, id]
    );
    return rows[0];
}

// Deleta uma dica do banco
export async function deletar(id) {
    const { rows } = await pool.query('DELETE FROM dicas WHERE id = $1 RETURNING *', [id]);
    return rows[0];
}