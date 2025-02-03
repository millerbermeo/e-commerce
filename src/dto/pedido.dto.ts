import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { EstadoPedido } from "../enums/estado-pedido.enum";

export class PedidosDto {

    @IsInt()
    usuario_id: number

    @IsArray()
    @IsNotEmpty({ each: true })
    public items?: {
      fk_producto: number;
      cantidad: number;
    }[] | null;

    @IsEnum(EstadoPedido)
    estado: EstadoPedido

    @IsInt()
    total_pedido: number

    @IsString()
    direccion_envio: string
}