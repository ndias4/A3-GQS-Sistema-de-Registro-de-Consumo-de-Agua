// src/services/alertService.js
import cron from 'node-cron';
import { pool } from '../config/db.js';

async function verificarEGerarAlertas() {
    console.log('--- Iniciando verificação de consumo para alertas ---');
    try {
        const { rows: usuarios } = await pool.query('SELECT id FROM usuarios');

        for (const usuario of usuarios) {
            // LÓGICA 1: Alerta de pico de consumo (sua regra de 20% adaptada)
            const mediaQuery = `
                SELECT AVG(consumo_dia) as media
                FROM (
                    SELECT SUM(litros) as consumo_dia FROM consumos
                    WHERE "usuarioId" = $1 AND "dataLeitura" BETWEEN NOW() - INTERVAL '30 days' AND NOW() - INTERVAL '1 day'
                    GROUP BY DATE("dataLeitura")
                ) as subquery
            `;
            const consumoOntemQuery = `SELECT SUM(litros) as total FROM consumos WHERE "usuarioId" = $1 AND DATE("dataLeitura") = CURRENT_DATE - 1`;
            
            const { rows: resMedia } = await pool.query(mediaQuery, [usuario.id]);
            const { rows: resOntem } = await pool.query(consumoOntemQuery, [usuario.id]);
            
            const media = resMedia[0]?.media;
            const consumoOntem = resOntem[0]?.total;

            if (media && consumoOntem && consumoOntem > media * 1.2) { // <- SUA REGRA DE 20%
                const mensagem = `Atenção: Seu consumo ontem foi de ${consumoOntem.toFixed(0)}L, mais de 20% acima da sua média diária.`;
                await pool.query('INSERT INTO alertas ("usuarioId", tipo, mensagem) VALUES ($1, $2, $3)', [usuario.id, 'pico_consumo', mensagem]);
                console.log(`ALERTA (Pico de Consumo) GERADO para o usuário ID: ${usuario.id}`);
            }

            // LÓGICA 2: Alerta de bandeira tarifária (sua regra)
            const consumoMesQuery = `
                SELECT SUM(litros) as total_mes FROM consumos 
                WHERE "usuarioId" = $1 AND DATE_TRUNC('month', "dataLeitura") = DATE_TRUNC('month', NOW())
            `;
            const { rows: resMes } = await pool.query(consumoMesQuery, [usuario.id]);
            const totalMes = resMes[0]?.total_mes;

            if (totalMes > 15000) {
                const mensagem = `Alerta Vermelho: Seu consumo acumulado este mês já ultrapassou 15.000L.`;
                await pool.query('INSERT INTO alertas ("usuarioId", tipo, mensagem) VALUES ($1, $2, $3)', [usuario.id, 'bandeira_vermelha', mensagem]);
                console.log(`ALERTA (Bandeira Vermelha) GERADO para o usuário ID: ${usuario.id}`);
            } else if (totalMes > 10000) {
                const mensagem = `Aviso Amarelo: Seu consumo acumulado este mês ultrapassou 10.000L.`;
                await pool.query('INSERT INTO alertas ("usuarioId", tipo, mensagem) VALUES ($1, $2, $3)', [usuario.id, 'bandeira_amarela', mensagem]);
                console.log(`ALERTA (Bandeira Amarela) GERADO para o usuário ID: ${usuario.id}`);
            }
        }
        console.log('--- Verificação de alertas concluída. ---');
    } catch (error) {
        console.error('Erro durante a verificação de alertas:', error);
    }
}

export const iniciarVerificadorDeAlertas = () => {
    cron.schedule('0 4 * * *', verificarEGerarAlertas, { // Roda todo dia às 4 da manhã
        scheduled: true,
        timezone: "America/Sao_Paulo"
    });
    console.log('✅ Verificador de Alertas (com regras customizadas) agendado para rodar todos os dias às 04:00.');
};