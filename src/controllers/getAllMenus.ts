import { Request, Response } from "express";

import { MenuService } from "../services/menuService";

const menuService = new MenuService()

export async function getAllMenus(_: Request, res: Response) {
    try {
        const menus = await menuService.getAllMenus()
        res.status(201).json({
            menus: menus
        })
    } catch (error: any) {
        res.status(404).json({
            error: error.message
        })
    }
}