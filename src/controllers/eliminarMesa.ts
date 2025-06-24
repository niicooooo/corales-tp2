import { Request, Response } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";

const mesaService = new MesaService()

export async function eliminarMesa(req: Request, res: Response) {
    try {

        const mesaId = Number(req.params.id)

        if (isNaN(mesaId)) {
            res.status(400).json({ 
                error: "El ID tiene que ser un numero." 
            })
            return
        }

        const mesaEliminada = await mesaService.eliminarMesa(req.body.id)

        res.status(201).json({
            message: "Mesa eliminada correctamente.",
            data: mesaEliminada
        })

    } catch (error: any) {

        console.log(ErrorMessage() + error.message)
        res.status(404).json({
            error: error.message
        })

    }
}