import { Response, Request } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";

const mesaService = new MesaService()

export async function reservarMesa(req: Request, res: Response) {
    try {
        const mesaReservada = await mesaService.reservarMesa(req.body)
        res.status(201).json({
            message: "Mesa reservada correctamente.",
            data: {
                id:  mesaReservada?.id,
                estado: mesaReservada?.estado
            }
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}