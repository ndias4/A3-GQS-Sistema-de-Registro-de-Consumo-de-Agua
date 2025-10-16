import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import consumoRoutes from './routes/consumoRoutes.js';
import dicaRoutes from './routes/dicaRoutes.js';
import alertaRoutes from './routes/alertaRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ROTAS DA APLICAÇÃO
app.use('/api/users', userRoutes);
app.use('/api/consumo', consumoRoutes);
app.use('/api/dicas', dicaRoutes);
app.use('/api/alertas', alertaRoutes);

export default app;