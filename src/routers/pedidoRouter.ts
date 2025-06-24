import { Router } from "express";

import { PedidoService } from "../services/pedidoService";
import { getEstadoPedidoById } from "../controllers/mostrarPedidoEstado";

const pedidoService = new PedidoService()

export const pedidoRouter = Router() 

pedidoRouter.get("/mostar-estado-pedido", getEstadoPedidoById)
pedidoRouter.post("/crear-pedido", async (req, res) => {
    
})