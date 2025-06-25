import { Response, Request } from "express";

import { PedidoService } from "../services/pedidoService";

const pedidoService = new PedidoService()

export async function cambiarEstadoPedido(req: Request, res: Response) {
    try {
        
        const {pedidoId, estado} = req.body

        const nuevoEstado = await pedidoService.cambiarEstadoPedido(pedidoId, estado)
        res.status(200).json({
            message: "Estado cambiado correctamente.",
            nuevo_estado: nuevoEstado
        })

    } catch (error: any) {

        res.status(400).json({
            error: error.message
        })

    }
}