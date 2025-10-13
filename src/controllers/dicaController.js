import { dicas } from "../services/dicaService.js";

export async function listarDicas(req, res) {
  try {
    res.json(dicas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
