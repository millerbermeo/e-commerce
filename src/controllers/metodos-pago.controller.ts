
import { NextFunction, Request, Response } from "express";
import { MetodosPagoSerivces } from "../services/metodos-pago.service";
import { CreateMetodoPagoDto, UpdateMetodoPagoDto } from "../dto/metodo-pago.dto";

export class MetodosPagoController {
    private metodosPagosServices: MetodosPagoSerivces

    constructor() {
        this.metodosPagosServices = new MetodosPagoSerivces()
    }


    public listarMetodosPago = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const metodos_pago = await this.metodosPagosServices.listarMetodosPago()
            res.status(200).json(metodos_pago)
        } catch (error) {
            next(error)
        }
    }

    public obtenerMetodosPago = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const metodo_pago = await this.metodosPagosServices.obtenerMetodoPago(req.params.id)
            res.status(200).json(metodo_pago)
        } catch (error) {
            next(error)
        }
    }


    public crearMetodoDePago = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const metodo_creado = await this.metodosPagosServices.crearMetodo(req.body as CreateMetodoPagoDto)
            res.status(201).json(metodo_creado)
        } catch (error) {
            next(error)
        }
    }


    public actualzarMetodo = async(req: Request, res:Response, next: NextFunction) => {
        try {
            const actualizarMetodoPago = await this.metodosPagosServices.actualizarMetodoPago(req.params.id, req.body as UpdateMetodoPagoDto)
            res.status(200).json(actualizarMetodoPago)
        } catch (error) {
            next(error)
        }
    }

    public eliminarMetodoPago = async(req: Request, res:Response, next: NextFunction) => {
        try {
            const eliminarMetodoPago = await this.metodosPagosServices.eliminarMetodoPago(req.params.id)
            res.status(200).json(eliminarMetodoPago)
        } catch (error) {
            next(error)
        }
    }
}