import { db } from "../db/db"
import { } from "../types/pedidoTypes";
import { crearPlatoPedidoBody } from "../types/platoPedidoTypes";

export class PlatoPedidoService {
    async crearPlatoPedido(pedidoId: string, platoId: number, cantidad: number) {

        const platoPedido = await db.platosPedidos.create({
            data: {
                pedidoId: pedidoId,
                platoId: platoId,
                cantidad: cantidad
            }
        })

        return platoPedido
    }
}