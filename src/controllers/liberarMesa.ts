import { Request, Response } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";

const mesaService = new MesaService()

export async function liberarMesa(req: Request, res: Response) {
    try {

        const mesaId = Number(req.params.id)

        if (isNaN(mesaId)) {
            res.status(400).json({ 
                error: "El ID tiene que ser un numero." 
            })
            return
        }

        const mesaLiberada = await mesaService.liberarMesa(mesaId)

        res.status(200).json({
            message: "Mesa liberada correctamente.",
            data: mesaLiberada
        })

    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(404).json({
            error: error.message
        })
    }
}