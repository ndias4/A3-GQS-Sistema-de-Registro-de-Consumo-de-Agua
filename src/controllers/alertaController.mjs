import * as AlertaModel from '../models/alertaModel.mjs';

/**
 * Busca e retorna todos os alertas para o usuário que fez a requisição.
 */
export async function listarAlertasDoUsuario(req, res) {
    try {
        const usuarioId = req.usuario.id; // ID vem do token JWT (authMiddleware)
        const alertas = await AlertaModel.listarPorUsuario(usuarioId);
        res.json(alertas);
    } catch (error) {
        console.error('Erro ao listar alertas:', error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
}

/**
 * Marca um alerta específico como lido.
 */
export async function marcarAlertaComoLido(req, res) {
    try {
        const { id: alertaId } = req.params; // ID do alerta vem da URL
        const usuarioId = req.usuario.id;    // ID do usuário vem do token

        const alertaAtualizado = await AlertaModel.marcarComoLido(alertaId, usuarioId);

        if (!alertaAtualizado) {
            // Isso pode acontecer se o alerta não existe ou não pertence ao usuário
            return res.status(404).json({ message: 'Alerta não encontrado ou não pertence a você.' });
        }

        res.status(200).json(alertaAtualizado);
    } catch (error) {
        console.error('Erro ao marcar alerta como lido:', error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
}
