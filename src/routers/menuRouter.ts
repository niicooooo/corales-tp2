import { Router } from "express";

import { getMenu } from "../controllers/menu";
import { getAllMenus } from "../controllers/getAllMenus";
import { crearMenu } from "../controllers/crearMenu";
import { validarCreacionDeMenu } from "../middleware/crearMenuMiddleware";

export const menuRouter = Router()

menuRouter.get("/listar-menus", getAllMenus)

menuRouter.get("/:id", getMenu)

menuRouter.post("/crear-menu",validarCreacionDeMenu,crearMenu)