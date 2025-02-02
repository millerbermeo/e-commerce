// import { RequestHandler } from 'express'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UsuarioServices } from '../services/usuarios.services'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

export const protectedRoute: RequestHandler = async (req, _, next) => {

    const usuarioServices = new UsuarioServices(); // Aquí creas la instancia

    const authHeader = req.header("authorization")

    if (!authHeader) {
        return next(notAuthenticated());
    }

    const accessToken = authHeader.replace(new RegExp("\\b[Bb]earer\\s"), "");

    try {
        const { usuario_id } = validateJWT(accessToken)
        const usuario = await usuarioServices.obtenerUsuario(usuario_id)

        if (usuario) {
            req.usuario = usuario;
            next();
        } else {
            next(invalidAccessToken());
        }

    } catch (err) {
        next(invalidAccessToken());
    }
}


const validateJWT = (token: string, verifyOptions?: jwt.VerifyOptions) => {
    const jwtVerifyOptions = Object.assign(
      { algorithms: "HS256" },
      verifyOptions,
      {
        issuer: "yourAPI.com",
        audience: "yourAPI.com:client",
      }
    );
    return jwt.verify(token, JWT_SECRET_KEY, jwtVerifyOptions) as T;
  };