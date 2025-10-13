import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdminMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", authMiddleware, isAdmin, getAllUsers);
// Exemplo de rota protegida:
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.email}!` });
});

export default router;
