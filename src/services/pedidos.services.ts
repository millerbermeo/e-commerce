import { pool } from "../database/conexion";
import { PedidosDto } from "../dto/pedido.dto";
import { UpdateProductoDto } from "../dto/producto.dto";
import { EstadoPedido } from "../enums/estado-pedido.enum";
import { Pedido } from "../models/pedidos.interface";
import { ItemsPedidosServices } from "./items-pedidos.services";
import { ProductosServices } from "./productos.services";

export class PedidosServices {

    private productosServices: ProductosServices
    private itemsPedidosServices: ItemsPedidosServices

    constructor() {
        this.productosServices = new ProductosServices()
        this.itemsPedidosServices = new ItemsPedidosServices()
    }

    async crearOrdenPedido(dto: PedidosDto): Promise<Pedido> {

        const { usuario_id, estado, total_pedido, direccion_envio, items } = dto;

        if (!items) {
            throw new Error("Items Vacios");
        }

        await Promise.all(
            items.map(async (item) => {
                const { fk_producto } = item

                const producto = await this.productosServices.obtenerProducto(String(fk_producto))

                if (!producto) {
                    throw new Error(
                        `Producto con ID ${fk_producto} no encontrado`,
                    );
                }

                return producto
            })
        )

        // CREAR ORDEN DEL PEDIDO
        const query = `INSERT INTO public.pedidos (usuario_id, estado, total_pedido, reccion_envio)
        VALUES ($1, $2, $3, $4) RETURNING *;`

        const values = [usuario_id, estado, total_pedido, direccion_envio]

        const result = await pool.query(query, [values])

        // CREAR ITEMS DE LA ORDEN ASOCIADA AL PRODUCTO
        await Promise.all(
            items.map(async (item) => {
                const { fk_producto, cantidad } = item

                const producto = await this.productosServices.obtenerProducto(String(fk_producto))

                if (!producto) {
                    throw new Error(
                        `Producto con ID ${fk_producto} no encontrado`,
                    );
                }

                let valuesItems = {
                    pedido_id: result.rows[0].id,
                    producto_id: producto.id,
                    cantidad_pedido: item.cantidad
                };

                const queryItems = await this.itemsPedidosServices.crearItemsPedidos(valuesItems)

                const productoActualizado: UpdateProductoDto = {
                    ...producto,
                    cantidad: producto.stock - cantidad,
                };
                
                await this.productosServices.actualizarProducto(String(fk_producto), productoActualizado)

                return queryItems
            })
        )
        
        return result.rows[0]
    }
}