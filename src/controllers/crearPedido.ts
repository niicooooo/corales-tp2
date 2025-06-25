import { Response, Request } from "express";

import { PedidoService } from "../services/pedidoService";
import { AuthService } from "../services/authService";
import { ErrorMessage } from "../utils/mensajes";

const pedidoService = new PedidoService()
const authService = new AuthService()

export async function crearPedido(req: Request, res: Response) {
    try {
        const {platos} = req.body

        const token = req.cookies.token
    
        if(!token) {
            throw new Error("La sesion expiró.")
        }
    
        const tokenDecodificado = await authService.decodificarToken(token)
    
        const {id, direccion} = tokenDecodificado
    
        const pedido = await pedidoService.crearPedido({ platos }, id, direccion)
  
        res.status(201).json({
            message: "Pedido creado correctamente.",
            data: pedido
        })
    } catch (error: any) {

        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })

    }

}