import { Request, Response } from "express";

import { PlatoService } from "../services/platoService";
import { ErrorMessage } from "../utils/mensajes";

const platoService = new PlatoService()

export async function eliminarPlato(req: Request, res: Response) {
    try {

        const platoId = Number(req.params.id)

        if (isNaN(platoId)) {
            res.status(400).json({ 
                error: "El ID tiene que ser un numero." 
            })
            return
        }

        const platoEliminado = await platoService.eliminarPlato(platoId)

        res.status(200).json({
            message: "Plato eliminado correctamente.",
            data: platoEliminado
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error)
        res.status(404).json({
            error: error.message
        })
    }
}