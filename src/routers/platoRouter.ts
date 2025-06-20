import { Router } from "express";

import { PlatoService } from "../services/platoService";

const platoService = new PlatoService()

export const platoRouter = Router()

platoRouter.post("/añadir-plato", async (req, res) => {
    try {
        const plato = await platoService.crearPlato(req.body)
        res.status(201).json({
            message: "Plato creado correctamente.",
            data: plato
        })
    } catch (error) {
        
    }
})

platoRouter.post("/eliminar-plato", async (req, res) => {
    try {
        const platoEliminado = await platoService.eliminarPlato(req.body)
        res.status(201).json({
            message: "Plato eliminado correctamente.", 
            data: platoEliminado
        })
    } catch (error) {
        
    }
})