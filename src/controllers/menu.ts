import { Request, Response } from "express";

import { MenuService } from "../services/menuService";
import { ErrorMessage } from "../utils/mensajes";

const menuService = new MenuService();

export async function getMenu(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            res.status(400).json({ 
                error: "El ID tiene que ser un numero." 
            })
            return
        }

        const menu = await menuService.getMenuById(id)

        res.status(200).json({
            message: "Menu devuelto exitosamente.",
            menus: menu
        })

    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}