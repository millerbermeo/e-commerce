import { pool } from "../database/conexion";
import { CreatePagoDto } from "../dto/pago.dto";
import { Pagos } from "../models/pagos.interface";

export class PagosServices {

    async registrarPago(dto: CreatePagoDto): Promise<Pagos[ ]> {

        const {orden_id, metodo_pago, monto, estado} = dto;

        const query = `INSERT INTO public.pagos (orden_id, metodo_pago, monto, estado)
        VALUES ($1, $2, $3, $4) RETURNING *;`

        let values = [orden_id, metodo_pago, monto, estado]

        const result = await pool.query(query, values)

        return result.rows
    }
}