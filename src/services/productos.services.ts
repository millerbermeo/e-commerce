import { pool } from "../database/conexion";
import { CreateProductoDto, UpdateProductoDto } from "../dto/producto.dto";
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

    async obtenerProducto(id: string): Promise<Producto | null> {
        const query = 'SELECT * FROM public.productos WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    async actualizarProducto(id: string, dto: UpdateProductoDto): Promise<Producto> {

        const producto = await this.obtenerProducto(id)

        if (!producto) {
            throw new Error(`El producto con ID ${id} no existe`);
        }

        const { nombre, descripcion, cantidad, categoria_id, imagen } = dto

        const query = `UPDATE FROM public.productos SET nombre = $1, descripcion = $2, cantidad = $3, $categoria_id = $4, imagen = $5 RETURNING *;`
        const values = [nombre, descripcion, cantidad, categoria_id, imagen];
        const result = await pool.query(query, values);
        return result.rows[0];
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