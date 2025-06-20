import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';
import { ErrorMessage } from '../utils/mensajes';

const usuarioService = new UsuarioService();

export async function register(req: Request, res: Response) {
    try {
        const usuarioRequest = req.body;
        const usuario = await usuarioService.registrarCliente(usuarioRequest);

        res.status(201).json(
            { data: "Usuario creado exitosamente." }
        )
        
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}