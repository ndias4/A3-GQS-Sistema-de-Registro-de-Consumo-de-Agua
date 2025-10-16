import request from 'supertest';
import app from '../src/app.mjs';
import { pool } from '../src/config/db.mjs';

describe('Testes de Autenticação de Usuário', () => {

    // Antes de todos os testes, garante que a tabela de usuários esteja limpa
    beforeAll(async () => {
        await pool.query('TRUNCATE TABLE usuarios CASCADE');
    });

    // Testes da Rota de Registro
    describe('POST /api/users/register', () => {
        it('Deve registrar um novo usuário com sucesso', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({ nome: 'Usuário de Teste', email: 'teste@exemplo.com', senha: '123' });
            
            expect(response.statusCode).toBe(201);
            expect(response.body.user.email).toBe('teste@exemplo.com');
        });

        it('Não deve registrar um usuário com email já existente', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({ nome: 'Outro Usuario', email: 'teste@exemplo.com', senha: '456' });

            expect(response.statusCode).toBe(400);
        });
    });

    // Testes da Rota de Login
    describe('POST /api/users/login', () => {
        it('Deve autenticar um usuário com credenciais corretas', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({ email: 'teste@exemplo.com', senha: '123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('Não deve autenticar com senha incorreta', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({ email: 'teste@exemplo.com', senha: 'senhaerrada' });

            expect(response.statusCode).toBe(401);
        });
    });

    // No final de todos os testes, fecha a conexão com o banco
    afterAll(async () => {
        await pool.end();
    });
});