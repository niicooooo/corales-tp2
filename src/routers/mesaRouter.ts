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

mesaRouter.delete("/eliminar-mesa/:id",autenticarAdmin, eliminarMesa)

mesaRouter.patch("/reservar-mesa/:id", reservarMesa)

mesaRouter.patch("/liberar-mesa/:id",autenticarAdmin, liberarMesa)