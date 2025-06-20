import { Request, Response } from "express";
import { MenuService } from "../services/menuService";
import { ErrorMessage } from "../utils/mensajes";

const menuService = new MenuService();

export async function getMenu(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id)
        const menu = await menuService.getMenuById(id)

        res.status(201).json({
            data: "Menu devuelto exitosamente."
        })

    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}