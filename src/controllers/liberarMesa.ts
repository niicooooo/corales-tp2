import { Request, Response } from "express";

import { MesaService } from "../services/mesaService";
import { AuthService } from "../services/authService";
import { ErrorMessage } from "../utils/mensajes";

const mesaService = new MesaService()
const authService = new AuthService()

export async function liberarMesa(req: Request, res: Response) {
    try {
        const token = req.cookies.token

        if(!token) {
            throw new Error("La sesion expiró.")
        }

        const tokenDecodificado = await authService.decodificarToken(token)

        const {rol} = tokenDecodificado

        if(rol == "CLIENTE") {
            throw new Error("No tiene los permisos necesarios.")
        }

        const mesaLiberada = await mesaService.cambiarEstadoMesaDisponible(req.body.mesaId)

        res.status(201).json({
            message: "Mesa liberada correctamente."
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}