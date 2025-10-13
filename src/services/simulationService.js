// src/services/simulationService.js

import cron from 'node-cron';
import { pool } from '../config/db.js';
import { registrarConsumo } from '../models/consumoModel.js'; // Reutilizaremos a função que já existe!

// Função que gera um valor de consumo diário aleatório (em litros)
function gerarConsumoAleatorio() {
    // Gera um número entre 150 e 500 litros, por exemplo
    return Math.floor(Math.random() * (500 - 150 + 1) + 150);
}

// Função principal da simulação
async function simularConsumoDiario() {
    console.log('--- Iniciando simulação de consumo diário ---');
    try {
        // 1. Buscar todos os usuários do sistema
        const { rows: usuarios } = await pool.query('SELECT id FROM usuarios');

        if (usuarios.length === 0) {
            console.log('Nenhum usuário encontrado para simulação.');
            return;
        }

        // 2. Para cada usuário, gerar e registrar um novo consumo
        for (const usuario of usuarios) {
            const consumoLitros = gerarConsumoAleatorio();
            // Para o valor, vamos simular um custo fictício, como R$ 0.01 por litro
            const valorEstimado = consumoLitros * 0.01;

            // Reutilizamos a função do consumoModel para inserir o dado
            await registrarConsumo(usuario.id, consumoLitros, valorEstimado);
            console.log(`Consumo de ${consumoLitros}L registrado para o usuário ID: ${usuario.id}`);
        }

        console.log('--- Simulação de consumo diário concluída com sucesso! ---');
    } catch (error) {
        console.error('Erro durante a simulação de consumo:', error);
    }
}

// 3. Agendar a tarefa para ser executada todos os dias às 3:00 da manhã
// A string '0 3 * * *' é a sintaxe do cron para "às 0 minutos da 3ª hora, todos os dias"
export const iniciarSimuladorIoT = () => {
    cron.schedule('0 3 * * *', simularConsumoDiario, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    });

    console.log('✅ Simulador de IoT agendado para rodar todos os dias às 03:00.');
};