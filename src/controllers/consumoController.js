import { registrarConsumo, listarConsumos, listarConsumoPorPeriodo } from "../models/consumoModel.js";

// Cálculo simples de valor estimado (exemplo fictício)
function calcularValorEstimado(litros) {
  const precoPorLitro = 0.01; // R$ 0,01 por litro (exemplo)
  return litros * precoPorLitro;
}

export async function adicionarConsumo(req, res) {
  try {
    const usuarioId = req.user.id; // vem do token JWT
    const { litros } = req.body;

    if (!litros || litros <= 0) {
      return res.status(400).json({ message: "Quantidade de litros inválida" });
    }

    const valorEstimado = calcularValorEstimado(litros);
    const consumo = await registrarConsumo(usuarioId, litros, valorEstimado);

    res.status(201).json(consumo);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
