import { EstadoPedido } from "../enums/estado-pedido.enum"

export interface Pedido {
    id: number
    usuario_id: number
    estado: EstadoPedido
    total_pedido: number
    direccion_envio: string
    create_at : Date
    update_at: Date
}