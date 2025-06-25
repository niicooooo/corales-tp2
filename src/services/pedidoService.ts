import { EstadoPedido } from "@prisma/client";
import { db } from "../db/db"
import { Decimal } from "@prisma/client/runtime/library";
import { PlatoPedidoService } from "./platoPedidoService";
import { UsuarioService } from "./usuarioService";

interface crearPedidoBody {
    platos: {
        platoId: number,
        cantidad: number
    }[]
}
export class PedidoService {

    private platoPedidoService = new PlatoPedidoService()
    private usuarioService = new UsuarioService()

    async getEstadoPedidoById(pedidoId: string) {

        const pedido = await db.pedido.findUnique({
            where: {
                id: pedidoId
            }
        })

        if(!pedido) {
            throw new Error("No se encontro el pedido con Id: " + pedidoId)
        }

        return pedido.estado

    }

    async cambiarEstadoPedido(pedidoId: string, nuevoEstado: EstadoPedido) {

        const pedido = await db.pedido.findUnique({
            where: {
                id: pedidoId
            }
        })

        if(!pedido) {
            throw new Error("No se encontro el pedido con Id: " + pedidoId)
        }

        if (pedido.estado == nuevoEstado) {
            throw new Error("El pedido ya tiene el estado: " + nuevoEstado)
        }

        const estado = await db.pedido.update({
            where: {
                id: pedidoId
            },
            data:{
                estado: nuevoEstado
            }
        })

        return estado.estado

    }

    async crearPedido(body: crearPedidoBody, clienteId: string, entrega: string) {

        const platos = body.platos

        let descuento = 0
        let sub_total = new Decimal(0)
        let total = new Decimal(0)

        const usuario = await db.usuario.findUnique({
            where: {
                id: clienteId
            },
            select: {
                cantidad_pedidos: true
            }
        })

        if(!usuario) {
            throw new Error("No se encontro al usuario con Id: " + clienteId)
        }

        let cant_pedidos = usuario.cantidad_pedidos ?? 0

        if (cant_pedidos > 3 && cant_pedidos <= 5) {
            descuento = 10
        } 

        if (cant_pedidos > 5 && cant_pedidos <= 7) {
            descuento = 20
        }

        if (cant_pedidos > 7) {
            descuento = 50
        }

        for (const plato of platos) {
            const { platoId, cantidad } = plato

            const platoData = await db.plato.findFirst({
                where: {
                    id: platoId
                }
            })

            if (!platoData) {
                throw new Error("No se encontro el plato con Id: " + platoId)
            }

            if (!platoData.activo) {
                throw new Error("El plato con Id:" + platoId + "no esta disponible.")
            }

            const precioTotal = platoData.precio.mul(cantidad)
            sub_total = sub_total.add(precioTotal)
        }

        if (descuento > 0) {
            const descuentoDecimal = new Decimal(descuento).div(100)
            const montoDescuento = sub_total.mul(descuentoDecimal)
            total = sub_total.minus(montoDescuento)
        } else {
            total = sub_total
        }

        const pedido = await db.pedido.create({
            data: {
                usuarioId: clienteId,
                estado: "PENDIENTE",
                monto: total,
                descuento: descuento,
                lugar_de_entrega: entrega
            }
        })

        await this.usuarioService.incrementarCantidadDePedidos(clienteId)

        for (const plato of platos) {
            const { platoId, cantidad } = plato

            await this.platoPedidoService.crearPlatoPedido(pedido.id, platoId, cantidad)
        }

        return pedido
    }
}