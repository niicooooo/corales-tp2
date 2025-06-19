import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

const Usuario = z.strictObject({
    nombre: z.string(),
    correo: z.string(),
    telefono: z.string(),
    direccion: z.string(),
    contraseña: z.string()
})

export function validarRegisterUsuario(req: Request, res: Response, next: NextFunction) {

    try {

        Usuario.parse(req.body)
        return next();

    } catch (error) {
        if (error instanceof ZodError) {
            const mensajesError = error.issues.map(issue => ({
                campo: issue.path.join("."),
                mensaje: issue.message  
            }))

            return res.status(400).json({
                error: "Error de validacion.",
                mensaje: mensajesError
            })
        }

        return res.status(500).json({
            error: "Error interno del servidor."
        })
    }

}