import * as DicaModel from '../models/dicaModel.mjs';

// Lista todas as dicas
export async function listarDicas(req, res) {
  try {
    const dicas = await DicaModel.listar();
    res.json(dicas);
  } catch (error) {
    console.error('Erro ao listar dicas:', error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

// Cria uma nova dica (Admin)
export async function criarDica(req, res) {
  try {
    // 1. Extrai a 'imagem_url' do corpo da requisição
    const { titulo, descricao, impacto, imagem_url } = req.body;

    // 2. Validação (agora imagem_url é opcional, mas o resto não)
    if (!titulo || !descricao || !impacto) {
        return res.status(400).json({ message: 'Título, descrição e impacto são obrigatórios.' });
    }

    // 3. Passa a imagem_url (que pode ser null) para o Model
    const novaDica = await DicaModel.criar(titulo, descricao, impacto, imagem_url);
    res.status(201).json(novaDica);
  } catch (error) {
    console.error('Erro ao criar dica:', error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

// Atualiza uma dica (Admin)
export async function atualizarDica(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, impacto } = req.body;

    if (!titulo || !descricao || !impacto) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const dicaAtualizada = await DicaModel.atualizar(id, titulo, descricao, impacto);
    if (!dicaAtualizada) {
        return res.status(404).json({ message: 'Dica não encontrada.' });
    }

    res.json(dicaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar dica:', error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

// Deleta uma dica (Admin)
export async function deletarDica(req, res) {
  try {
    const { id } = req.params;
    
    const dicaDeletada = await DicaModel.deletar(id);
    if (!dicaDeletada) {
        return res.status(404).json({ message: 'Dica não encontrada.' });
    }

    res.status(200).json({ message: 'Dica deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar dica:', error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}