import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService()

export async function autenticarAdmin(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token

    if(!token) {
        res.status(401).json({
            error: "La sesion expiró."
        })
        return
    }

    const tokenDecodificado = await authService.decodificarToken(token)

    const {rol} = tokenDecodificado

    if(rol != "ADMIN") {
        res.status(403).json({
            error: "No tiene los permisos necesarios."
        })
        return
    }

    return next()
}