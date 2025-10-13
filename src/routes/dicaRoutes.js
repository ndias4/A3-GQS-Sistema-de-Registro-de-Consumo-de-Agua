import { Router } from "express";
import { listarDicas } from "../controllers/dicaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, listarDicas);

export default router;
