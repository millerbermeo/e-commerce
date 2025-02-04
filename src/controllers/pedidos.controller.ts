import { NextFunction, Request, Response } from "express";
import { ProductosServices } from "../services/productos.service";
import { PedidosServices } from "../services/pedidos.service";
import { PedidosDto, UpdatePedidosDto } from "../dto/pedido.dto";

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

    public listarPedidos  = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pedidos = await this.pedidosServices.listarPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            next(error)
        }
    }

    public actualizarPedidos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pedidoActualizado = await this.pedidosServices.actualizarPedido(req.params.id, req.body as UpdatePedidosDto)
            res.status(200).json(pedidoActualizado)
        }  catch (error) {
            next(error)
        }
    }
}