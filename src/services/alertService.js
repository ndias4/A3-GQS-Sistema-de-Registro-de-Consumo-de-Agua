import { pool } from "../config/db.js";

export async function verificarAlertas(usuarioId) {
  // 1. Pegar todos os consumos do usuário
  const result = await pool.query(
    "SELECT litros, data_registro FROM consumos WHERE usuario_id = $1",
    [usuarioId]
  );
  const consumos = result.rows;

  if (consumos.length === 0) return { alertas: [] };

  // 2. Calcular média de consumo
  const total = consumos.reduce((acc, c) => acc + Number(c.litros), 0);
  const media = total / consumos.length;

  // 3. Último consumo
  const ultimo = consumos[0];

  const alertas = [];

  if (ultimo.litros > media * 1.2) {
    alertas.push("⚠️ Seu último consumo foi 20% maior que sua média.");
  }

  // 4. Verificar consumo mensal acumulado
  const mesAtual = new Date().getMonth();
  const totalMes = consumos
    .filter(c => new Date(c.data_registro).getMonth() === mesAtual)
    .reduce((acc, c) => acc + Number(c.litros), 0);

  if (totalMes > 15000) {
    alertas.push("🔴 Você ultrapassou a bandeira tarifária vermelha.");
  } else if (totalMes > 10000) {
    alertas.push("🟡 Você está na bandeira tarifária amarela.");
  } else {
    alertas.push("🟢 Seu consumo está na bandeira tarifária verde.");
  }

  return { alertas, media, totalMes };
}
