import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import consumoRoutes from "./routes/consumoRoutes.js";
import alertaRoutes from "./routes/alertaRoutes.js";
import dicaRoutes from "./routes/dicaRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/consumos", consumoRoutes);
app.use("/api/alertas", alertaRoutes);
app.use("/api/dicas", dicaRoutes);
app.use("/api", testRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
