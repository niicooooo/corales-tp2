import { Request, Response } from "express";
import { UsuarioService } from "../services/usuarioService";
import { AuthService } from "../services/authService";

import { ErrorMessage } from "../utils/mensajes";

const usuarioService = new UsuarioService();
const authService = new AuthService();

export async function login(req: Request, res: Response) {
    try {
        const tokenViejo = req.cookies.token

        if(tokenViejo) {
            throw new Error("Ya hay una sesion iniciada.")
        }

        const {correo, contraseña} = req.body

        const usuario = await usuarioService.logearCliente(correo, contraseña)

        const token = await authService.generarJsonWebAccessToken({
            id: usuario.id,
            rol: usuario.rol
        })

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict'
        })

        res.status(200).json({
            data: "Inicio de sesion correcto."
        })
        
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}