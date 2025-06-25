import { Router } from "express";

import { getEstadoPedidoById } from "../controllers/mostrarPedidoEstado";
import { crearPedido } from "../controllers/crearPedido";
import { validarCreacionDePedido } from "../middleware/crearPedidoMiddleware";
import { validarCambioDeEstado } from "../middleware/cambiarEstadoPedidoMiddleware";
import { validarEmptyBody } from "../middleware/validarEmptyBodyMiddlewate";
import { autenticarAdmin } from "../middleware/autenticarAdminMiddleware";
import { cambiarEstadoPedido } from "../controllers/cambiarEstadoPedido";

export const pedidoRouter = Router() 

pedidoRouter.get("/mostrar-estado-pedido/:id", getEstadoPedidoById)

pedidoRouter.post("/crear-pedido", validarEmptyBody ,validarCreacionDePedido ,crearPedido)

pedidoRouter.patch("/cambiar-estado-pedido", validarEmptyBody , autenticarAdmin, validarCambioDeEstado, cambiarEstadoPedido)