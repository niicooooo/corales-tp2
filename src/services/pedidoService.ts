import { db } from "../db/db"
import { cambiarEstadoPedidoBody, crearPedidoBody, getEstadoPedidoBody } from "../types/pedidoTypes";
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

    async cambiarEstadoPedido(body: cambiarEstadoPedidoBody) {
        try {
            const pedido = await db.pedido.update({
                where: {
                    id: body.id
                },
                data:{
                    estado: body.estado
                }
            })

            return pedido;
        } catch (error) {
            
        }
    }

    async crearPedido(body: crearPedidoBody) {
        try {
            
        } catch (error) {
            
        }
    }
}