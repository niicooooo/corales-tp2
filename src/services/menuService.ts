import { db } from "../db/db"
import { getMenuByIdBody } from "../types/menuTypes"

export class MenuService {

    async getMenuById(menuId: getMenuByIdBody) {
        try {
            
            const platos = await db.menu.findUnique({
                where: {
                    id: menuId.id
                },
                include: {
                    platos: true
                }
            })

            return platos;

        } catch (error) {
            
        }
    }

}