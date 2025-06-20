import { db } from "../db/db"
import { registerClienteBody } from "../types/usuarioTypes"
import bcrypt from "bcrypt"

const salt_rounds = Number(process.env.SALT_ROUNDS)
export class UsuarioService{

    async registrarCliente(body: registerClienteBody) {
        
        const correo = await db.usuario.findFirst({
            where: {
                correo: body.correo
            }
        })

        if(correo){
            throw new Error("Correo ya registrado.")
        }

        const telefono = await db.usuario.findFirst({
            where: {
                telefono: body.telefono
            }
        })

        if(telefono) {
            throw new Error("Telefono ya registrado.")
        }

        const cliente = await db.usuario.create({
            data: {
                nombre: body.nombre,
                correo: body.correo,
                telefono: body.telefono,
                direccion: body.direccion,
                rol: "CLIENTE",
                contraseña: await bcrypt.hash(body.contraseña, salt_rounds)
            }
        })

        return cliente.id;
    }

    async logearCliente(correo: string, contraseña: string) {
            
        const usuario = await db.usuario.findFirst({
            where: {
                correo: correo
            }
        })

        if(!usuario) {
            throw new Error("El usuario no existe.")
        }

        const isValid = await bcrypt.compare(contraseña, usuario.contraseña)

        if(!isValid) {
            throw new Error("Constraseña incorrecta.")
        }

        return usuario
    }
}