import { Router } from "express";

import { getMenu } from "../controllers/menu";

export const menuRouter = Router()

menuRouter.get("/:id", getMenu)