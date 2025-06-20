import { Router } from "express";

import { getMesasDisponibles } from "../controllers/mesasDisponibles";
import { crearMesa } from "../controllers/crearMesa";
import { liberarMesa } from "../controllers/liberarMesa";
import { reservarMesa } from "../controllers/reservarMesa";

export const mesaRouter = Router()

mesaRouter.get("/mesas-disponibles", getMesasDisponibles)

mesaRouter.post("/crear-mesa", crearMesa)

mesaRouter.post("/reservar-mesa/:id", reservarMesa)

mesaRouter.post("/liberar-mesa/:id", liberarMesa)