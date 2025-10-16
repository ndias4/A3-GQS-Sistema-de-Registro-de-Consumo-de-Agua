import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { isAdmin } from "../middleware/isAdminMiddleware.mjs";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", authMiddleware, isAdmin, getAllUsers);
// Exemplo de rota protegida:
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.email}!` });
});

export default router;
