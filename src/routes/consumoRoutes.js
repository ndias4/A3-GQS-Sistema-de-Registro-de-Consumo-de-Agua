import { Router } from "express";
import { adicionarConsumo, obterConsumos, obterConsumoPeriodo, gerarRelatorioMensal } from "../controllers/consumoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// Aplica o middleware de autenticação a TODAS as rotas definidas abaixo neste arquivo.
router.use(authMiddleware);

// Agora as rotas não precisam mais ter o middleware declarado individualmente.
router.post("/", adicionarConsumo);
router.get("/", obterConsumos);
router.get("/periodo", obterConsumoPeriodo);
router.get("/relatorio/mensal", gerarRelatorioMensal);

export default router;