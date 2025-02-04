import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.controller";
import { validateDto } from "../middlewares/validate-dto";
import { PedidosDto, UpdatePedidosDto } from "../dto/pedido.dto";

const pedidosController = new PedidosController()

const route = Router()

route.get('/', pedidosController.listarPedidos)
route.post('/', validateDto(PedidosDto), pedidosController.crearOrdenPedido);
route.put('/:id', validateDto(UpdatePedidosDto), pedidosController.actualizarPedidos);


export default route