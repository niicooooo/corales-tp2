import { Router } from "express";

import { PedidoService } from "../services/pedidoService";

const pedidoService = new PedidoService()

export const pedidoRouter = Router() 

pedidoRouter.get("/mostar-estado-pedido", async (req, res) => {
    try {
        const estado = await pedidoService.getEstadoPedido(req.body)
        res.status(201).json({
            message: "Estado del pedido.",
            data: estado
        })
    } catch (error) {
        
    }
})

pedidoRouter.post("/crear-pedido", async (req, res) => {
    
})