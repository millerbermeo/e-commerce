import { Router } from "express";
import { PagosController } from "../controllers/pagos.controller";
import { validateDto } from "../middlewares/validate-dto";
import { CreatePagoDto, UpdatePagoDto, UpdatePagoEstadoDto } from "../dto/pago.dto";

const pagosController = new PagosController()

const route = Router()

route.get('/', pagosController.listarPagos)
route.get('/:id', pagosController.obtenerPago)
route.post('/', validateDto(CreatePagoDto),pagosController.crearPagos)
route.put('/', validateDto(UpdatePagoDto), pagosController.actualizarPago)
route.patch('/:id', validateDto(UpdatePagoEstadoDto), pagosController.actualizarEstado)


export default route