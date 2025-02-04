import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePagoDto {

    @IsNotEmpty()
    @IsInt()
    orden_id : number

    @IsNotEmpty()
    @IsInt()
    metodo_pago : number

    @IsNotEmpty()
    @IsInt()
    monto : number

    @IsString()
    estado: string
}