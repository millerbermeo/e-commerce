import { NextFunction, Request, Response } from "express";
import { UsuarioServices } from "../services/usuarios.services";
import { CreateUsuarioDto } from "../dto/usuario.dto";

export class UsuarioController {
    private usuarioServices: UsuarioServices

    constructor() {
        this.usuarioServices = new UsuarioServices()
    }

    public crearUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const usuarioCreado = await this.usuarioServices.crearNuevoUsuario(req.body as CreateUsuarioDto);
          res.status(201).json(usuarioCreado);
        } catch (error) {
          next(error);
        }
      }

    public listarUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const usuarios = await this.usuarioServices.listarUsuarios()
            res.status(200).json(usuarios)
        } catch (error) {
            next(error);
        }
    }



    public obtenerUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const usuarios = await this.usuarioServices.obtenerUsuario(req.params.id)
            res.status(200).json(usuarios)
        } catch (error) {
            next(error);
        }
    }


}