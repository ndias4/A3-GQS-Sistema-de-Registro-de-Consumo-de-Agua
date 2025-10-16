import dotenv from 'dotenv';

// Carrega as variáveis de ambiente corretas (dev ou teste)
if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

import app from './app.mjs'; // Importa a configuração do Express
import { iniciarSimuladorIoT } from './services/simulationService.mjs';
import { iniciarVerificadorDeAlertas } from './services/alertService.mjs';

// A lógica de iniciar o servidor e os serviços
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        iniciarSimuladorIoT();
        iniciarVerificadorDeAlertas();
    });
}