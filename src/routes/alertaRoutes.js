import { Router } from "express";
import { obterAlertas } from "../controllers/alertaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, obterAlertas);

export default router;
