import { Router } from "express";
import { pool } from "../config/db.mjs";

const router = Router();

router.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "✅ Conectado ao banco!", time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
