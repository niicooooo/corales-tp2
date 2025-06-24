import { db } from "../db/db"
import bcrypt from "bcrypt"

const salt_rounds = Number(process.env.SALT_ROUNDS)
export class UsuarioService{

    async registrarCliente(nombre: string, correo: string, telefono: string, direccion: string, contraseña: string) {
        
        const mail = await db.usuario.findUnique({
            where: {
                correo: correo
            }
        })

        if(mail){
            throw new Error("Correo ya registrado.")
        }

        const phone = await db.usuario.findUnique({
            where: {
                telefono: telefono
            }
        })

        if(phone) {
            throw new Error("Telefono ya registrado.")
        }

        const cliente = await db.usuario.create({
            data: {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                direccion: direccion,
                rol: "CLIENTE",
                contraseña: await bcrypt.hash(contraseña, salt_rounds)
            }
        })

        return cliente.id
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

    async incrementarCantidadDePedidos(usuarioId: string) {
        
        const usuario = await db.usuario.findUnique({
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            throw new Error("No se encontro al usuario con Id: " + usuarioId)
        }

        const ususarioModificado = await db.usuario.update({
            where: {
                id: usuarioId
            }, data: {
                cantidad_pedidos: {
                    increment: 1
                }
            }
        })

        return ususarioModificado
    }
}