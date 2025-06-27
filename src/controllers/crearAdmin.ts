import { Request, Response } from "express";

import { AuthService } from "../services/authService";
import { UsuarioService } from "../services/usuarioService";
import { ErrorMessage } from "../utils/mensajes";

const usuarioService = new UsuarioService()

export async function crearUsuarioAdmin(req: Request, res: Response) {
    try {
        const {nombre, correo, telefono, direccion, contraseña} = req.body
        const admin = await usuarioService.crearUsuarioAdmin(nombre, correo, telefono, direccion, contraseña)

        res.status(201).json(
            { data: "Admin creado exitosamente." }
        )
        
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(409).json({
            error: error.message
        })
    }
}