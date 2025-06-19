import { Router } from "express"

import { UsuarioService } from "../services/usuarioService"
import { validarRegisterUsuario } from "../middleware/usuarioMiddleware"
import { ErrorMessage } from "../utils/mensajes"

const usuarioService = new UsuarioService()

export const usuarioRouter = Router()

usuarioRouter.post("/register", async (req, res) => {
    try {
        const clienteRequest = req.body
        const userCreated = await usuarioService.crearCliente(clienteRequest)
        res.status(201).json({ 
            data: userCreated
        })
    } catch (error) {
        console.log(ErrorMessage() + "Error al crear el usuario.", error)
        res.status(400).json({
            error: (error as any).message
        })
    }
})

usuarioRouter.get("/mesas-disponibles", async (req, res) => {
    try {
        const mesasDisponibles = await usuarioService.verMesasDisponibles()
        res.status(201).json({
            data: mesasDisponibles
        })
    } catch (error) {

    }
})