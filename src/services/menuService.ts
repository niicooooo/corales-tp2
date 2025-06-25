import { db } from "../db/db"
export class MenuService {

    async getMenuById(menuId: number) {

        const menu = await db.menu.findUnique({
            where: { 
                id: menuId 
            },
            select: {
                id: true,
                nombre: true,
                platos: {
                    where: {
                        activo: true
                    }
                }
            }
        })

        if (!menu) {
            throw new Error("No existe el menú con Id: " + menuId)
        }

        if (menu.platos.length === 0) {
            throw new Error("El menú con Id: " + menuId + " no tiene ningún plato disponible.")
        }

        return menu
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