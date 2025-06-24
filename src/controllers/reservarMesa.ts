import { Response, Request } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";

const mesaService = new MesaService()

export async function reservarMesa(req: Request, res: Response) {
    try {

        const {mesaId, usuarioId} = req.body

        const mesaReservada = await mesaService.reservarMesa(mesaId, usuarioId)
        res.status(201).json({
            message: "Mesa reservada correctamente.",
            data: {
                id:  mesaReservada.id,
                estado: mesaReservada.estado
            }
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        if(error.message == "La mesa no esta disponible para ser reservada.") {
            res.status(409).json({
                error: error.message
            })
        }
        res.status(404).json({
            error: error.message
        })
    }
}