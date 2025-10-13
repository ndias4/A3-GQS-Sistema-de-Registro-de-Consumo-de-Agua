import request from 'supertest';
import app from '../src/app.js';
import { pool } from '../src/config/db.js';

describe('Testes das Rotas de Consumo (Protegidas)', () => {
    let token;
    let usuarioId;

    // Antes de tudo, criamos um usuário e pegamos seu token para usar nos testes
    beforeAll(async () => {
        await pool.query('TRUNCATE TABLE usuarios, consumos CASCADE');
        const userRes = await request(app).post('/api/users/register').send({ nome: 'Usuario Consumo', email: 'consumo@teste.com', senha: '123' });
        usuarioId = userRes.body.user.id;
        
        const loginRes = await request(app).post('/api/users/login').send({ email: 'consumo@teste.com', senha: '123' });
        token = loginRes.body.token;
    });

    it('Deve registrar um novo consumo para o usuário autenticado', async () => {
        const response = await request(app)
            .post('/api/consumo')
            .set('Authorization', `Bearer ${token}`) // << Enviando o token
            .send({ litros: 350 });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.data.usuarioId).toBe(usuarioId);
    });

    it('Não deve permitir acesso sem um token', async () => {
        const response = await request(app).get('/api/consumo');
        expect(response.statusCode).toBe(401);
    });

    it('Deve listar os consumos apenas do usuário autenticado', async () => {
        const response = await request(app)
            .get('/api/consumo')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].usuarioId).toBe(usuarioId);
    });

    afterAll(async () => {
        await pool.end();
    });
});