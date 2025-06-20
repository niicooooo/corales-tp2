import { db } from "../db/db"
import { } from "../types/pedidoTypes";
import { crearPlatoPedidoBody } from "../types/platoPedidoTypes";

export class PlatoPedidoService {
    async crearPlatoPedido(body: crearPlatoPedidoBody) {
        try {
            
            const platoPedido = await db.platosPedidos.create({
                data: {
                    pedidoId: body.pedidoId,
                    platoId: body.platoId,
                    cantidad: body.cantidad
                }
            })

            return platoPedido;

        } catch (error) {
            
        }
    }
}