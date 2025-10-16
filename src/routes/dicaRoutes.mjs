import { Router } from "express";
// 1. Importaremos as novas funções que AINDA VAMOS CRIAR no controller
import { 
    listarDicas, 
    criarDica, 
    atualizarDica, 
    deletarDica 
} from "../controllers/dicaController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
// 2. Precisamos importar o middleware de admin
import { isAdmin } from "../middleware/isAdminMiddleware.mjs";

const router = Router();

// ROTA PÚBLICA (ou para usuários logados)
// Qualquer usuário logado pode ver as dicas.
// Se quiser que seja 100% pública, é só remover o 'authMiddleware'.
router.get("/", authMiddleware, listarDicas);

// --- ROTAS DE ADMINISTRAÇÃO ---
// Apenas administradores podem criar, atualizar ou deletar dicas.
// Note a sequência de middlewares: primeiro autentica, depois verifica se é admin.

// Rota para CRIAR uma nova dica
router.post("/", authMiddleware, isAdmin, criarDica);

// Rota para ATUALIZAR uma dica existente pelo ID
router.put("/:id", authMiddleware, isAdmin, atualizarDica);

// Rota para DELETAR uma dica pelo ID
router.delete("/:id", authMiddleware, isAdmin, deletarDica);


export default router;