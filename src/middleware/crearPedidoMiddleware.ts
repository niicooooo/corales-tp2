import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const PedidoCreacion = z.object({
  platos: z.array(
    z.object({
      platoId: z.number().int().positive({ 
        message: "El ID debe ser un número positivo"
     }),
    cantidad: z.number().int().positive({ 
        message: "La canttidad debe ser un número positivo" 
    })
    })
  ).nonempty({ 
    message: "Debe haber al menos un plato" 
    })
}).strict({
    message: "Se ingreso un campo por demas."
})

export async function validarCreacionDePedido(req: Request, res: Response, next: NextFunction) {
    
    const result = PedidoCreacion.safeParse(req.body)

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