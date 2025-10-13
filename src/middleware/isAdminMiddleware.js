export const isAdmin = (req, res, next) => {
  // Este middleware assume que o 'authMiddleware' já foi executado
  // e aninhou os dados do usuário em req.usuario.
  const { role } = req.usuario;

  if (role && role === 'admin') {
    // Se o usuário tiver o papel 'admin', permite que a requisição continue.
    next();
  } else {
    // Se não for admin, retorna um erro 403 Forbidden.
    // 403 é o código correto aqui: "Eu sei quem você é, mas você não tem permissão."
    res.status(403).json({ message: "Acesso negado. Rota exclusiva para administradores." });
  }
};