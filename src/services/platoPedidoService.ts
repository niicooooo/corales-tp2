import { db } from "../db/db"
import { agregarPlatoAlPedidoBody } from "../types/pedidoTypes";

export class PlatoPedidoService {
    async crearPlatoPedido(body: agregarPlatoAlPedidoBody) {
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