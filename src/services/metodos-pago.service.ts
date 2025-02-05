import { pool } from "../database/conexion";
import { CreateMetodoPagoDto, UpdateMetodoPagoDto } from "../dto/metodo-pago.dto";
import { MetodosPago } from "../models/metodos-pago.interface";

export class MetodosPagoSerivces {

    async crearMetodo(dto: CreateMetodoPagoDto): Promise<MetodosPago> {

        const { nombre, estado, descripcion } = dto

        const query = `INSERT INTO public.metodos_pago (nombre, estado, descripcion)
        VALUES ($1, $2, $3) RETURNING *;
        `
        const values = [nombre, estado, descripcion]

        const result = await pool.query(query, values)

        return result.rows[0]
    }

    async listarMetodosPago(): Promise<MetodosPago[]> {
        const query = `SELECT * FROM metodos_pago`
        const result = await pool.query(query)
        return result.rows
    }

    async obtenerMetodoPago(id: string): Promise<MetodosPago | null> {

        const query = `SELECT * FROM metodos_pago WHERE id = $1;`

        const result = await pool.query(query, [id])

        return result.rows[0]
    }

    async actualizarMetodoPago(id: string, dto: UpdateMetodoPagoDto): Promise<MetodosPago> {
          
        const metodo_pago = await this.obtenerMetodoPago(id)

        if (!metodo_pago) {
            throw new Error(`El metodo de pago con ID ${id} no existe`);
        }

        const nombre = dto.nombre ?? metodo_pago?.nombre
        const descripcion = dto.descripcion ?? metodo_pago?.descripcion
        const estado = dto.estado ?? metodo_pago?.estado

        const query =  `UPDATE metodos_pago SET nombre = $1, descripcion = $2, estado = $3 WHERE id = $4 RETURNING *;`
        const values = [nombre, descripcion, estado, id]
        const result = await pool.query(query, values)
        
        return result.rows[0]
    }

    async eliminarMetodoPago(id:string) : Promise<boolean> {
        const metodo_pago = await this.obtenerMetodoPago(id)

        if (!metodo_pago) {
            throw new Error(`El metodo de pago con ID ${id} no existe`);
        }

        const query = `DELETE FROM public.metodos_pago WHERE id = $1;`

        const result = await pool.query(query, [id])

        return result.rows.length > 0
    }
}