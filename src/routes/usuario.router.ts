import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const usuarioController = new UsuarioController()

const route = Router()

route.get('/', usuarioController.listarUsuarios)
route.post('/', usuarioController.crearUsuario)

export default route