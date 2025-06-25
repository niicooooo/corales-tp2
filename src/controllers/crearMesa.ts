import { Request, Response } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";

const mesaService = new MesaService()

export async function crearMesa(_: Request, res: Response) {
    try {
        
        const mesa = await mesaService.crearMesa()

        res.status(201).json({
            message: "Mesa creada correctamente.",
            data: mesa
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message    
        })
    }
}