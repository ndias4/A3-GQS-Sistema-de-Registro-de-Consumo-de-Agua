import { Router } from "express";
import { adicionarConsumo, obterConsumos, obterConsumoPeriodo } from "../controllers/consumoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Aplica o middleware de autenticação a TODAS as rotas definidas abaixo neste arquivo.
router.use(authMiddleware);

// Agora as rotas não precisam mais ter o middleware declarado individualmente.
router.post("/", adicionarConsumo);
router.get("/", obterConsumos);
router.get("/periodo", obterConsumoPeriodo);

export default router;