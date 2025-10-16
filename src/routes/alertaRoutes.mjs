import { Router } from "express";
import { listarAlertasDoUsuario, marcarAlertaComoLido } from "../controllers/alertaController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = Router();

// Aplica o middleware de autenticação a todas as rotas de alertas
router.use(authMiddleware);

// Rota para o usuário logado buscar seus alertas
router.get("/", listarAlertasDoUsuario);

// Rota para o usuário marcar um alerta específico como lido
router.patch("/:id/lido", marcarAlertaComoLido);

export default router;