import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.controller";
import { validateDto } from "../middlewares/validate-dto";
import { PedidosDto } from "../dto/pedido.dto";

const pedidosController = new PedidosController()

const route = Router()

route.post('/', validateDto(PedidosDto), pedidosController.crearOrdenPedido);

export default route