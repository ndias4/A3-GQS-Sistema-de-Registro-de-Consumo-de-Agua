import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as UserModel from '../models/userModel.mjs';

// Função de Registro
export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const userExists = await UserModel.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    
    // 2. USAMOS O MODEL
    const user = await UserModel.createUser(nome, email, hashedPassword);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: user,
    });
  } catch (error) {
    console.error("ERRO DETALHADO NO REGISTRO:", error);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};

// Função de Login
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // 3. USAMOS O MODEL
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: { id: user.id, nome: user.nome, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("ERRO DETALHADO NO LOGIN:", error);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};

// --- FUNÇÃO NOVA ---
// GET /api/users/me
export const getUserProfile = async (req, res) => {
  try {
    // O ID do usuário vem do token (anexado pelo authMiddleware)
    const userId = req.usuario.id; 
    
    // 4. USAMOS O MODEL
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// --- FUNÇÃO NOVA ---
// PUT /api/users/me
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
    }

    // 5. USAMOS O MODEL
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      return res.status(400).json({ message: 'Este email já está em uso por outra conta.' });
    }

    // 6. USAMOS O MODEL
    const userAtualizado = await UserModel.updateUser(userId, nome, email);
    
    res.json(userAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// Função de Admin (já existente)
export const getAllUsers = async (req, res) => {
  try {
    // 7. (Opcional) Podemos criar UserModel.findAll() para isso
    const { rows } = await pool.query("SELECT id, nome, email, role FROM usuarios ORDER BY nome ASC");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};