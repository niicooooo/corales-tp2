import { CategoriaPlato } from "@prisma/client";
import { db } from "../db/db"
import { Decimal } from "@prisma/client/runtime/library"

export class PlatoService {
    async crearPlato(nombre: string, descripcion: string, precio: Decimal, categoria: CategoriaPlato, menuId: number) {

        const menuExistente = await db.menu.findUnique({
            where:{
                id: menuId
            }
        })
        
        if(!menuExistente) {
            throw new Error("No existe ninguno menu con el ID: " + menuId)
        }

        const platoExistente = await db.plato.findUnique({
            where: {
                nombre: nombre
            }
        })

        if(platoExistente) {
            throw new Error("Ya existe un plato con ese nombre.")
        }
        
        const plato = await db.plato.create({
            data: {
                nombre: nombre,
                descripcion: descripcion,
                precio: new Decimal(precio),
                categoria: categoria,
                menuId: menuId
            }
        })

        return plato
    }
    
    async eliminarPlato(platoId: number) {

        const plato = await db.plato.findUnique({
            where: {
                id: platoId
            }
        })

        if(!plato) {
            throw new Error("No se encontro el plato con el Id: " + platoId)
        }

        if(!plato.activo) {
            throw new Error("El plato con Id: " + platoId + " ya esta eliminado.")
        }

        const platoEliminado = await db.plato.update({
            where: {
                id: platoId
            }, 
            data: {
                activo: false
            }
        })

        return platoEliminado
    }
}