import { Request, Response } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";
import { AuthService } from "../services/authService";

const mesaService = new MesaService()
const authService = new AuthService()

export async function crearMesa(req: Request, res: Response) {
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

        const mesa = await mesaService.crearMesa()

        res.status(201).json({
            message: "Mesa creada correctamente."
        })
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message    
        })
    }
}