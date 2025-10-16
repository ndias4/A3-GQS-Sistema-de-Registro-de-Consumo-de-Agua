import { registrarConsumo, listarConsumos, listarConsumoPorPeriodo } from "../models/consumoModel.mjs";
import * as ConsumoModel from "../models/consumoModel.mjs";

// Cálculo simples de valor estimado (exemplo fictício)
function calcularValorEstimado(litros) {
  const precoPorLitro = 0.015; // Usando o mesmo valor da tarifa de exemplo
  return litros * precoPorLitro;
}

export async function adicionarConsumo(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { litros } = req.body;

    if (!litros || litros <= 0) {
      return res.status(400).json({ message: "Quantidade de litros inválida" });
    }

    const valorEstimado = calcularValorEstimado(litros);
    const novoConsumo = await ConsumoModel.registrarConsumo(usuarioId, litros, valorEstimado);

    // Estrutura de resposta padronizada que o teste espera
    res.status(201).json({ message: "Consumo registrado com sucesso!", data: novoConsumo });
  } catch (error) {
    // Adicione um console.error para ver o erro exato no futuro
    console.error("Erro ao adicionar consumo:", error);
    res.status(500).json({ message: "Erro ao registrar consumo." });
  }
}

export async function obterConsumos(req, res) {
  try {
    const { id, role } = req.usuario; 
    let consumos;

    if (role === 'admin') {
      consumos = await listarTodosOsConsumos(); 
    } else {
      consumos = await listarConsumos(id);
    }
    res.json(consumos);
  } catch (error) {
    console.error("Erro ao obter consumos:", error);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
}

export async function obterConsumoPeriodo(req, res) {
  try {
    const usuarioId = req.user.id;
    const { inicio, fim } = req.query;

    if (!inicio || !fim) {
      return res.status(400).json({ message: "Informe início e fim do período" });
    }

    const consumos = await listarConsumoPorPeriodo(usuarioId, inicio, fim);
    res.json(consumos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function gerarRelatorioMensal(req, res) {
  try {
    const { id, role } = req.usuario;
    let relatorio;

    if (role === 'admin') {
      // Se for admin, busca o relatório geral
      relatorio = await ConsumoModel.gerarRelatorioMensalGeral();
    } else {
      // Se for usuário comum, busca o relatório apenas para seu ID
      relatorio = await ConsumoModel.gerarRelatorioMensalPorUsuario(id);
    }

    res.json(relatorio);
  } catch (error) {
    console.error('Erro ao gerar relatório mensal:', error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

export async function calcularEstimativaMensal(req, res) {
    try {
        const usuarioId = req.usuario.id;

        // 1. Buscar a tarifa de água ativa no banco
        const tarifa = await ConsumoModel.obterTarifaAtiva();
        if (!tarifa) {
            return res.status(500).json({ message: "Nenhuma tarifa de água ativa encontrada no sistema." });
        }

        // 2. Buscar o consumo total do usuário no mês atual
        const consumoMes = await ConsumoModel.obterConsumoMesAtualPorUsuario(usuarioId);

        // 3. Realizar o cálculo
        const consumoTotalLitros = Number(consumoMes?.consumo_total_litros || 0);
        const valorPorLitro = Number(tarifa.valor_por_litro);
        const estimativaCusto = consumoTotalLitros * valorPorLitro;

        // 4. Retornar a resposta formatada
        res.json({
            mes_referencia: new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
            consumo_total_litros: consumoTotalLitros,
            valor_por_litro: valorPorLitro,
            estimativa_custo: estimativaCusto.toFixed(2) // Formata para duas casas decimais
        });

    } catch (error) {
        console.error('Erro ao calcular estimativa mensal:', error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
}