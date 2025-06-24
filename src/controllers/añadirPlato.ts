import { Request, Response } from "express";

import { PlatoService } from "../services/platoService";
import { ErrorMessage } from "../utils/mensajes";

const platoService = new PlatoService()

export async function crearPlato(req: Request, res: Response) {
    try {

        const {nombre, descripcion, precio, categoria, menuId} = req.body

        const plato = await platoService.crearPlato(nombre, descripcion, precio, categoria, menuId)
    
        res.status(201).json({
            message: "Plato creado correctamente.",
            data: plato
        })

    } catch (error: any) {

        console.log(ErrorMessage() + error)
        res.status(404).json({
            error: error.message
        })
        
    }
}