import { Router } from "express";
import { MetodosPagoController } from "../controllers/metodos-pago.controller";
import { validateDto } from "../middlewares/validate-dto";
import { CreateMetodoPagoDto, UpdateMetodoPagoDto } from "../dto/metodo-pago.dto";

const metodosPagosController = new MetodosPagoController()

const route = Router()

route.get('/', metodosPagosController.listarMetodosPago)
route.get('/:id', metodosPagosController.obtenerMetodosPago)
route.post('/', validateDto(CreateMetodoPagoDto), metodosPagosController.crearMetodoDePago)
route.put('/:id', validateDto(UpdateMetodoPagoDto), metodosPagosController.actualzarMetodo)
route.delete('/', metodosPagosController.eliminarMetodoPago)

export default route

