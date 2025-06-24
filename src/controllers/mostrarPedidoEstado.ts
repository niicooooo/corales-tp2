import { Response, Request } from "express";

import { PedidoService } from "../services/pedidoService";
import { ErrorMessage } from "../utils/mensajes";

const pedidoService = new PedidoService()

export async function getEstadoPedidoById(res: Response, req: Request) {
    try {
        
        const id = req.params.id

        const estado = await pedidoService.getEstadoPedidoById(id)
        res.status(201).json({
            data: estado
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(404).json({
            error: error.message
        })
    }
}