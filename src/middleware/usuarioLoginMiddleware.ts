import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const UsuarioLogin = z.object({
    correo: z.string({
        required_error: "El correo es requerido.",
        invalid_type_error: "El correo tiene que ser string."
    }).email("Correo invalido.").min(3),
    contraseña: z.string({
        required_error: "La contraseña es requerida."
    }).min(6, "La contraseña deber tener como minimo 6 caracteres.")
}).strict({
    message: "Se paso un campo por demas."
})
export async function validarLoginUsuario(req: Request, res: Response, next: NextFunction) {

    const result = UsuarioLogin.safeParse(req.body)

    if(!result.success) {
        const errors = result.error.errors.map(err => ({
            campo: err.path.join("."),
            mensaje: err.message
        }))

        res.status(400).json({errors})
        return
    }

    return next()
}