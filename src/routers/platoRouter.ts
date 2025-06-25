import { Router } from "express";

import { validarCreacionDePlato } from "../middleware/crearPlatoMiddleware";
import { crearPlato } from "../controllers/crearPlato";
import { autenticarAdmin } from "../middleware/autenticarAdminMiddleware";
import { eliminarPlato } from "../controllers/eliminarPlato";
import { validarEmptyBody } from "../middleware/validarEmptyBodyMiddlewate";

export const platoRouter = Router()

platoRouter.post("/crear-plato",validarEmptyBody,autenticarAdmin,validarCreacionDePlato, crearPlato)

platoRouter.delete("/eliminar-plato/:id", autenticarAdmin, eliminarPlato)