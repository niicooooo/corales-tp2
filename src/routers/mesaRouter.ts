import { Router } from "express";

import { getMesasDisponibles } from "../controllers/mesasDisponibles";
import { crearMesa } from "../controllers/crearMesa";
import { liberarMesa } from "../controllers/liberarMesa";
import { reservarMesa } from "../controllers/reservarMesa";
import { eliminarMesa } from "../controllers/eliminarMesa";
import { autenticarAdmin } from "../middleware/autenticarAdminMiddleware";
import { validarEmptyBody } from "../middleware/validarEmptyBodyMiddlewate";

export const mesaRouter = Router()

mesaRouter.get("/mesas-disponibles", getMesasDisponibles)

mesaRouter.post("/crear-mesa",validarEmptyBody,autenticarAdmin, crearMesa)

mesaRouter.post("/eliminar-mesa/:id",autenticarAdmin, eliminarMesa)

mesaRouter.post("/reservar-mesa/:id", reservarMesa)

mesaRouter.post("/liberar-mesa/:id",autenticarAdmin, liberarMesa)