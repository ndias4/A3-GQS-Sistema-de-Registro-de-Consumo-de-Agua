import { verificarAlertas } from "../services/alertService.js";

export async function obterAlertas(req, res) {
  try {
    const usuarioId = req.user.id;
    const result = await verificarAlertas(usuarioId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
