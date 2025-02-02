import { pool } from "../database/conexion";
import { CreateProductoDto } from "../dto/producto.dto";
import { Producto } from "../models/productos.interface";

export class ProductosServices {

    async crearProducto(dto: CreateProductoDto): Promise<Producto> {
        const { nombre, descripcion, cantidad, categoria_id, imagen } = dto

        const query = `
              INSERT INTO public.productos (nombre, descripcion, cantidad, categoria_id, imagen)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *;
          `;

        const values = [nombre, descripcion, cantidad, categoria_id, imagen];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async listarProductos(): Promise<Producto[]> {
        const query = 'SELECT * FROM public.productos';
        const result = await pool.query(query);
        return result.rows;
    }

    async obtenerUsuario(id: string): Promise<Producto | null> {
        const query = 'SELECT * FROM public.productos WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async eliminarProducto(id: string): Promise<boolean> {
        const query = 'DELETE FROM public.productos WHERE id = $1 RETURNING *'
        const result = await pool.query(query, [id])
        return result.rows.length > 0
    }

    async filtrarProductos(tipo: string, value: string): Promise<Producto[]> {
        const query = `SELECT * FROM WHERE ${tipo} = ${value}`;
        const result = await pool.query(query)
        return result.rows
    }
}