import { NextFunction, Request, Response } from "express";
import { PagosServices } from "../services/pagos.service";
import { CreatePagoDto, UpdatePagoDto, UpdatePagoEstadoDto } from "../dto/pago.dto";

export class PagosController {

    private pagosServices: PagosServices

    constructor() {
        this.pagosServices = new PagosServices()
    }

    public listarPagos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pagos = await this.pagosServices.listarPagos()
            res.status(200).json(pagos)
        } catch (error) {
            next(error)
        }
    }

    public obtenerPago = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pago = await this.pagosServices.obtenerPago(req.params.id)
            res.status(200).json(pago)
        } catch (error) {
            next(error)
        }
    }

    public crearPagos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const crearPagos = await this.pagosServices.registrarPago(req.body as CreatePagoDto)
            res.status(201).json(crearPagos)
        } catch (error) {
            next(error)
        }
    }

    public actualizarPago = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const actualizarPagos = await this.pagosServices.actualizarPago(req.params.id, req.body as UpdatePagoDto)
            res.status(200).json(actualizarPagos)
        } catch (error) {
            next(error)
        }
    }

    public actualizarEstado = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const estadoPago = await this.pagosServices.cambiarEstado(req.params.id, req.body as UpdatePagoEstadoDto)
            res.status(200).json(estadoPago)
        } catch (error) {
            next(error)
        }
    }

}