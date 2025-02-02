import { pool } from "../database/conexion";
import { CreateUsuarioDto } from "../dto/usuario.dto";
import { EstadoUsuario } from "../enums/estado-usuario.enum";
import { Producto } from "../models/productos.interface";
import { Usuario } from "../models/usuario.interface";

export class UsuarioServices {

    async crearNuevoUsuario(dto: CreateUsuarioDto): Promise<Usuario> {
        const { nombre, edad, correo, password, direccion, rol, estado } = dto;
    
        // Si no se proporciona 'estado', usa el valor predeterminado 'activo'
        const estadoFinal = estado || EstadoUsuario.activo;
    
        const query = `
            INSERT INTO public.usuarios (nombre, edad, correo, password, direccion, rol, estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
    
        const values = [nombre, edad, correo, password, direccion, rol, estadoFinal];
        const result = await pool.query(query, values);
    
        return result.rows[0];
    }    


    async obtenerUsuario(id: string): Promise<Producto | null> {
        const query = 'SELECT * FROM public.usuarios WHERE id = $1'
        const result = await pool.query(query)
        return result.rows ? result.rows[0] : null
    }


    async listarUsuarios(): Promise<Producto[]> {
        const query = 'SELECT * FROM public.usuarios'
        const result = await pool.query(query)
        return result.rows
    }

}