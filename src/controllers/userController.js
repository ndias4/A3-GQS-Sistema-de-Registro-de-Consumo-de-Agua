import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// Registro de usuário
export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Verifica se o email já existe
    const userExists = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Insere o novo usuário
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de usuário
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query("SELECT id, nome, email, senha, role FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const user = result.rows[0];

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const payload = { 
      id: user.id, 
      role: user.role 
    };

    // Gera o token JWT
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: { id: user.id, nome: user.nome, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Buscamos todos os usuários, mas excluímos a senha do retorno por segurança.
    const result = await pool.query("SELECT id, nome, email, role FROM usuarios ORDER BY nome ASC");
    
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};
