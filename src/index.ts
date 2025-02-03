import express, { Response } from "express"
import cors from 'cors'
import { pool } from "./database/conexion";
import rutaUsuarios from './routes/usuario.routes'
import authRouter from "./routes/auth.routes";
import { authenticate } from "./middlewares/auth.middleware";

const app = express();
const port = 3000;

// Ruta de prueba
app.get('/', (_, res: Response) => {
  res.send('¡Hola Mundo desde Express!');
});

app.use(cors());  // Para permitir CORS si es necesario
app.use(express.json());
app.use('/api', authenticate);

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("conexión establecida");
  } catch (error) {
    console.error("error de conexión: ", error);
  }
})();

app.use('/usuarios', rutaUsuarios)
app.use("/auth", authRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});