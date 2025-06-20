import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const UsuarioRegister = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre tiene que ser string."
    }).min(1, "El nombre debe contener por lo menos 1 caracter."),
    correo: z.string({
        required_error: "El correo es requerido.",
        invalid_type_error: "El correo tiene que ser string."
    }).email("Email invalido.").min(3),
    telefono: z.string({
        required_error: "El telefono es requerido.",
        invalid_type_error: "El telefono tiene que ser string."
    }),
    direccion: z.string({
        required_error: "La direccion es requerida.",
        invalid_type_error: "La direccion tiene que ser string."
    }).min(3),
    contraseña: z.string({
        required_error: "La contraseña es requerida."
    }).min(6, "La contraseña debe tener como minimo 6 caracteres.")
})

export async function validarRegisterUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {

    const result = UsuarioRegister.safeParse(req.body)

    if(!result.success) {
        const errores = result.error.errors.map(err => ({
            campo: err.path.join("."),
            mensaje: err.message
        }))

        res.status(400).json({errores}) 
        return;
    }

    return next();
}