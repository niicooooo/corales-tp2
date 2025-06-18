import { db } from "../db/db"
import { getEstadoPedidoBody, PedidoCompletoBody } from "../types/pedidoTypes";
import { PlatoPedidoService } from "./platoPedidoService";
import { Decimal } from "@prisma/client/runtime/library";

export class PedidoService {

    async getEstadoPedido(pedidoId: getEstadoPedidoBody) {
        try {

            const pedido = await db.pedido.findUnique({
                where: {
                    id: pedidoId.id
                },
                select: {
                    estado: true
                }
            })

            return pedido?.estado;

        } catch (error) {
            
        }
    }
}