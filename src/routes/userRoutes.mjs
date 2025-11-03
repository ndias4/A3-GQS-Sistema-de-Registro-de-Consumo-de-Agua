import { Router } from "express";
import { registerUser, loginUser, getAllUsers, getUserProfile, updateUserProfile } from "../controllers/userController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { isAdmin } from "../middleware/isAdminMiddleware.mjs";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// --- ROTAS NOVAS (Protegidas) ---
// Rota para buscar os dados do próprio usuário
router.get('/me', authMiddleware, getUserProfile);

// Rota para atualizar os dados do próprio usuário
router.put('/me', authMiddleware, updateUserProfile);

// Rota de Admin
router.get('/', authMiddleware, isAdmin, getAllUsers);

router.get("/users", authMiddleware, isAdmin, getAllUsers);
// Exemplo de rota protegida:
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.email}!` });
});

export default router;
