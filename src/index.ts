import express, {Response} from "express"
import { pool } from "./database/conexion";
import rutaUsuarios from './routes/usuario.router'

const app = express();
const port = 3000;

app.use(express.json());

// Ruta de prueba
app.get('/', (_, res: Response) => {
  res.send('¡Hola Mundo desde Express!');
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("conexión establecida");
  } catch (error) {
    console.error("error de conexión: ", error);
  }
})();

app.use('/usuarios', rutaUsuarios)


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});