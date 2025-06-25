import { Response, Request } from "express";

import { PedidoService } from "../services/pedidoService";
import { ErrorMessage } from "../utils/mensajes";

const pedidoService = new PedidoService()

export async function getEstadoPedidoById(req: Request, res: Response) {
    try {
        
        const id = req.params.id

        const estado = await pedidoService.getEstadoPedidoById(id)
        res.status(200).json({
            estado: estado
        })

    } catch (error: any) {
        
        console.log(ErrorMessage() + error.message)
        res.status(404).json({
            error: error.message
        })
    
    }
}