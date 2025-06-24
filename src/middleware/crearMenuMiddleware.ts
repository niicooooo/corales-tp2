import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const Menu = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre tiene que ser string."
    })
}).strict({
    message: "Se paso un campo por demas."
})

export async function validarCreacionDeMenu(req: Request, res: Response, next: NextFunction) {
    
    const result = Menu.safeParse(req.body)

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