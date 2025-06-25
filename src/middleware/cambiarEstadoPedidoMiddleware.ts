import { EstadoPedido } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import { z } from "zod";

const cambiarEstadoPedido = z.object({
    pedidoId: z.string({
        required_error: "El ID del pedido es requerida",
        invalid_type_error: "El pedido tiene que ser de tipo string."
    }).min(1, {message: "Debe ingresar minimo 1 caracter."}),
    estado: z.nativeEnum(EstadoPedido, {
        errorMap: () => ({
            message: `Estado invalido. Debe ser uno de: ${Object.values(EstadoPedido).join(", ")}`
        })
    })
}).strict({
    message: "Se envio un campo por demas."
})

export async function validarCambioDeEstado(req: Request, res: Response, next: NextFunction) {
    const result = cambiarEstadoPedido.safeParse(req.body)

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