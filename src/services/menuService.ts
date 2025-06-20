import { db } from "../db/db"
import { getMenuByIdBody } from "../types/menuTypes"

export class MenuService {

    async getMenuById(menuId: number) {

        const platos = await db.menu.findUnique({
            where: {
                id: menuId
            },
            include: {
                platos: true
            }
        })

        if(!platos) {
            throw new Error("El menu: " + menuId + ". No tiene ningun plato.")
        }

        return platos;
    }

}