import { Request, Response } from "express";

import { MesaService } from "../services/mesaService";

const mesaService = new MesaService()

export async function getMesasDisponibles(_: Request, res: Response) {
    try {
        const mesasDisponibles = await mesaService.getMesasDisponibles()
        res.status(201).json({
            mesas_disponibles: mesasDisponibles
        })
    } catch (error: any) {
        res.status(404).json({
            error: error.message
        })
    }
}