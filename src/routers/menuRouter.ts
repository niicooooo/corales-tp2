import { Router } from "express";

import { getMenu } from "../controllers/menu";
import { getAllMenus } from "../controllers/getAllMenus";
import { crearMenu } from "../controllers/crearMenu";
import { validarCreacionDeMenu } from "../middleware/crearMenuMiddleware";
import { autenticarAdmin } from "../middleware/autenticarAdminMiddleware";
import { validarEmptyBody } from "../middleware/validarEmptyBodyMiddlewate";

export const menuRouter = Router()

menuRouter.get("/listar-menus", getAllMenus)

menuRouter.get("/mostrar-menu-por-id/:id", getMenu)

menuRouter.post("/crear-menu",validarEmptyBody ,autenticarAdmin,validarCreacionDeMenu,crearMenu)