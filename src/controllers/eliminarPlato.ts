import { Request, Response } from "express";

import { PlatoService } from "../services/platoService";
import { ErrorMessage } from "../utils/mensajes";

const platoService = new PlatoService()

export async function eliminrPlato(req: Request, res: Response) {
    try {

        const platoId = req.body.platoId

        if (isNaN(platoId)) {
            res.status(400).json({ 
                error: "El ID tiene que ser un numero." 
            })
            return
        }

        const platoEliminado = await platoService.eliminarPlato(platoId)

        res.status(400).json({
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