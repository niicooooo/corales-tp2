import { Router } from "express";

import { validarCreacionDePlato } from "../middleware/platoCreateMiddleware";
import { crearPlato } from "../controllers/añadirPlato";
import { autenticarAdmin } from "../middleware/autenticarAdminMiddleware";
import { eliminrPlato } from "../controllers/eliminarPlato";
import { validarEmptyBody } from "../middleware/validarEmptyBodyMiddlewate";

export const platoRouter = Router()

platoRouter.post("/crear-plato",validarEmptyBody,autenticarAdmin,validarCreacionDePlato, crearPlato)

platoRouter.post("/eliminar-plato/:id", autenticarAdmin, eliminrPlato)