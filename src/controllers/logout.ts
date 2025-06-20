import { Request, Response } from "express";
import { ErrorMessage } from "../utils/mensajes";

export async function logout(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            throw new Error("No hay ninguna sesion iniciada")
        } 
        res.clearCookie('token', { 
            httpOnly: true, 
            sameSite: 'strict' 
        })
        res.status(200).json({ message: 'Sesion cerrada exitosamente' });
    } catch (error: any) {
        console.log(ErrorMessage() + error.message)
        res.status(400).json({
            error: error.message
        })
    }
}