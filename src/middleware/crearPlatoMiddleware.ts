import { CategoriaPlato } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const PlatoCreacion = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido.",
        invalid_type_error: "El nombre debe ser un string."
    }),
    descripcion: z.string({
        required_error: "La descripción es requerida.",
        invalid_type_error: "La descripción debe ser un string."
    }),
    precio: z.string().refine(val => !isNaN(Number(val)), {
        message: "El precio debe ser un número válido."
    }),
    categoria: z.nativeEnum(CategoriaPlato, {
        required_error: "La categoría es requerida.",
        invalid_type_error: "La categoría debe ser válida."
    }),
    menuId: z.number({
        required_error: "El menuId es requerido."
    })
}).strict({
    message: "Se paso un campo por demas."
})

export async function validarCreacionDePlato(req: Request, res: Response, next: NextFunction) {

    const result = PlatoCreacion.safeParse(req.body)

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