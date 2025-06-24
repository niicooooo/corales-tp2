import { db } from "../db/db"
export class MenuService {

    async getMenuById(menuId: number) {

        const menu = await db.menu.findUnique({
            where: {
                id: menuId
            }
        })

        if(!menu) {
            throw new Error("No existe el menu con Id: " + menuId)
        }

        const platos = await db.menu.findMany({
            where: {
                id: menuId
            },
            select: {
                platos: true
            }
        })

        if(platos.length == 0) {
            throw new Error("El menu: " + menuId + " no tiene ningun plato disponible.")
        }

        return platos   
    }

    async getAllMenus() {

        const menus = await db.menu.findMany({})

        if(menus.length == 0) {
            throw new Error("No hay ningun menu creado.")
        }

        return menus

    }

    async crearMenu(nombre: string) {
        
        const menuExistente = await db.menu.findFirst({
            where: {
                nombre: nombre
            }
        })

        if(menuExistente) {
            throw new Error("Ya existe un menu con ese nombre.")
        }

        const menu = await db.menu.create({
            data: {
                nombre: nombre
            }
        })

        return menu
    }

} 