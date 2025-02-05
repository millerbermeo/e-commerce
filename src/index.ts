import express, { Response } from "express";
import cors from 'cors';
import { pool } from "./database/conexion";
import { authenticate } from "./middlewares/auth.middleware";

import rutaUsuarios from './routes/usuario.routes';
import authRouter from "./routes/auth.routes";
import rutaProductos from './routes/productos.routes';
import rutaPedidos from './routes/pedidos.routes';
import rutaPagos from './routes/pago.routes';
import rutaMetodosPago from './routes/metodos-pago.routes';


const app = express();
const port = 3000;

// Ruta de prueba
app.get('/', (_, res: Response) => {
  res.send('¡Hola Mundo desde Express!');
});

app.use(cors());
app.use(express.json());

// Rutas públicas (sin autenticación)
app.use("/auth", authRouter);

// Middleware de autenticación (se aplica a todas las rutas después de esta línea)
app.use(authenticate);

// Rutas protegidas (requieren autenticación)
app.use('/api/usuarios', rutaUsuarios);
app.use('/api/productos', rutaProductos);
app.use('/api/pedidos', rutaPedidos);
app.use('/api/pagos', rutaPagos);
app.use('/api/metodos-pagos', rutaMetodosPago);




(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Conexión establecida");
  } catch (error) {
    console.error("Error de conexión: ", error);
  }
})();

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
