import { Router } from "express"

import { ClienteService } from "../services/clienteService"

const usuarioService = new ClienteService()

export const clienteRouter = Router()

clienteRouter.post("/register", async (req, res) => {
    try {
        // parse body con zod
        const clienteRequest = req.body
        const userCreated = await usuarioService.crearCliente(clienteRequest)
        res.status(201).json({ data: userCreated})
    } catch (error) {
        // if error instanceof zoderror
        const mensageError = (error as any).issues.map(issue => {
            const campo = issue.path[0]
            const expected = issue.expected
            
        })
        res.status(400).json({error: (error as any).message})
    }
})