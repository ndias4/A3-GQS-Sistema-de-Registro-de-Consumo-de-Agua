import { pool } from "../config/db.mjs";

export async function registrarConsumo(usuarioId, litros, valorEstimado) {
    const query = `
        INSERT INTO consumos ("usuarioId", litros, "valorEstimado", "dataLeitura") 
        VALUES ($1, $2, $3, NOW()) 
        RETURNING *
    `;
    const values = [usuarioId, litros, valorEstimado];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function listarConsumos(usuarioId) {
  const query = 'SELECT * FROM consumos WHERE "usuarioId" = $1 ORDER BY "dataLeitura" DESC';
  const { rows } = await pool.query(query, [usuarioId]);
  return rows;
}

export async function listarConsumoPorPeriodo(usuarioId, inicio, fim) {
  const result = await pool.query(
    'SELECT * FROM consumos WHERE "usuarioId" = $1 AND "dataLeitura" BETWEEN $2 AND $3 ORDER BY "dataLeitura"',
    [usuarioId, inicio, fim]
  );
  return result.rows;
}

export async function gerarRelatorioMensal(usuarioId = null) {
    let query = `
        SELECT
            DATE_TRUNC('month', "dataLeitura") AS mes,
            SUM(litros) AS consumo_total_litros
        FROM
            consumos
        WHERE
            "dataLeitura" >= NOW() - INTERVAL '1 year'
    `;
    const params = [];

    // Se um ID de usuário for fornecido, adiciona o filtro à query
    if (usuarioId) {
        query += ` AND "usuarioId" = $1`;
        params.push(usuarioId);
    }

    query += `
        GROUP BY mes
        ORDER BY mes ASC;
    `;

    const { rows } = await pool.query(query, params);
    return rows;
}

export async function obterTarifaAtiva() {
    const query = 'SELECT valor_por_litro FROM tarifas WHERE ativo = TRUE LIMIT 1';
    const { rows } = await pool.query(query);
    return rows[0];
}

/**
 * Calcula o consumo total de litros de um usuário no mês corrente.
 */
export async function obterConsumoMesAtualPorUsuario(usuarioId) {
    const query = `
        SELECT SUM(litros) as consumo_total_litros 
        FROM consumos 
        WHERE 
            "usuarioId" = $1 AND 
            DATE_TRUNC('month', "dataLeitura") = DATE_TRUNC('month', NOW())
    `;
    const { rows } = await pool.query(query, [usuarioId]);
    return rows[0];
}

// Calcula o consumo total de litros de um usuário NO DIA ATUAL
export async function obterConsumoHojePorUsuario(usuarioId) {
    const query = `
        SELECT SUM(litros) as consumo_total_hoje 
        FROM consumos 
        WHERE 
            "usuarioId" = $1 AND 
            DATE("dataLeitura") = CURRENT_DATE;
    `;
    // CURRENT_DATE é uma função do PostgreSQL que retorna a data de hoje
    const { rows } = await pool.query(query, [usuarioId]);
    return rows[0]; // Retorna { consumo_total_hoje: '123.00' } ou { consumo_total_hoje: null }
}

// Busca o consumo (em litros) do mês atual E do mês anterior
export async function obterComparativoMensal(usuarioId) {
    const query = `
        SELECT
            -- Soma para o Mês Atual
            SUM(CASE WHEN DATE_TRUNC('month', "dataLeitura") = DATE_TRUNC('month', CURRENT_DATE)
                     THEN litros ELSE 0 END) AS consumo_mes_atual,
            
            -- Soma para o Mês Anterior
            SUM(CASE WHEN DATE_TRUNC('month', "dataLeitura") = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
                     THEN litros ELSE 0 END) AS consumo_mes_anterior
        FROM
            consumos
        WHERE
            "usuarioId" = $1 AND
            "dataLeitura" >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month');
    `;
    const { rows } = await pool.query(query, [usuarioId]);
    return rows[0]; // Retorna { consumo_mes_atual: '123', consumo_mes_anterior: '456' }
}