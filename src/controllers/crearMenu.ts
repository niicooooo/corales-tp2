import { Response, Request } from "express";

import { MenuService } from "../services/menuService";
import { ErrorMessage } from "../utils/mensajes";

const menuService = new MenuService()

export async function crearMenu(req: Request, res: Response) {
    try {

        const { nombre } = req.body

        const menu = await menuService.crearMenu(nombre)
        res.status(201).json({
            message: "Menu creado correctamente.",
            data: menu
        })

    } catch (error: any) {

        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
        
    }
}