import { pool } from "../database/conexion";
import { CreatePagoDto, UpdatePagoDto, UpdatePagoEstadoDto } from "../dto/pago.dto";
import { Pagos } from "../models/pagos.interface";

export class PagosServices {

    async registrarPago(dto: CreatePagoDto): Promise<Pagos[]> {

        const { orden_id, metodo_pago, monto, estado } = dto;

        const query = `INSERT INTO public.pagos (orden_id, metodo_pago, monto, estado)
        VALUES ($1, $2, $3, $4) RETURNING *;`

        let values = [orden_id, metodo_pago, monto, estado]

        const result = await pool.query(query, values)

        return result.rows
    }


    async listarPagos(): Promise<Pagos[]> {

        const query = `SELECT * FROM public.pagos;`
        const result = await pool.query(query)
        return result.rows

    }

    async obtenerPago(id: string): Promise<Pagos | null> {
        const query = `SELECT * FROM public.pagos WHERE id = $1`
        const result = await pool.query(query, [id])
        return result.rows[0]
    }

    async actualizarPago(id: string, dto: UpdatePagoDto): Promise<Pagos | null> {

        const pago = await this.obtenerPago(id)

        const orden_id = pago?.orden_id
        const metodo_pago = dto.metodo_pago ?? pago?.metodo_pago
        const monto = pago?.monto
        const estado = dto.estado ?? pago?.monto

        const query = `UPDATE public.pagos SET orden_id = $1, metodo_pago = $2, monto = $3, estado = $4 WHERE id = $5 RETURNING *;`

        const values = [orden_id, metodo_pago, monto, estado]

        const result = await pool.query(query, values)

        return result.rows[0]
    }

    async cambiarEstado(id: string, dto: UpdatePagoEstadoDto): Promise<Pagos> {

        const pago = await this.obtenerPago(id)

        const estado = dto.estado ?? pago?.estado

        const query = `UPDATE public.pagos SET estado = $1 WHERE id = $2 RETURNING *;`

        const result = await pool.query(query, [estado, id])

        return result.rows[0]
    }


}