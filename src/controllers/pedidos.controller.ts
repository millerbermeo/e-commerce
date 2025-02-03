import { NextFunction, Request, Response } from "express";
import { ProductosServices } from "../services/productos.services";
import { PedidosServices } from "../services/pedidos.services";
import { PedidosDto } from "../dto/pedido.dto";

export class PedidosController {
    
    private pedidosServices: PedidosServices

    constructor() {
        this.pedidosServices = new PedidosServices()
    }

    public crearOrdenPedido = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ordenCreada = await this.pedidosServices.crearOrdenPedido(req.body as PedidosDto)
            res.status(201).json(ordenCreada)
        } catch (error) {
            next(error)
        }
    }
}