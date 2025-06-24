import { Router } from "express"

import { validarRegisterUsuario } from "../middleware/usuarioRegisterMiddleware"
import { validarLoginUsuario } from "../middleware/usuarioLoginMiddleware"
import { register } from "../controllers/register"
import { login } from "../controllers/login"
import { logout } from "../controllers/logout"
import { validarEmptyBody } from "../middleware/validarEmptyBodyMiddlewate"

export const usuarioRouter = Router()

usuarioRouter.post("/register",validarEmptyBody, validarRegisterUsuario, register)

usuarioRouter.post("/login",validarEmptyBody, validarLoginUsuario, login)

usuarioRouter.post("/logout", logout)