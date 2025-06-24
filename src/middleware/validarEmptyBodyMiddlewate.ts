import { Response, Request, NextFunction } from "express";

export async function validarEmptyBody(req: Request, res: Response, next: NextFunction) {
    if(!req.body || Object.keys(req.body).length == 0) {
        res.status(400).json({
            error: "El cuerpo de la solicitud esta vacio."
        })
        return
    }

    return next()
}