import { Response, Request } from "express";

import { MesaService } from "../services/mesaService";
import { ErrorMessage } from "../utils/mensajes";
import { AuthService } from "../services/authService";

const mesaService = new MesaService()
const authService = new AuthService()

export async function reservarMesa(req: Request, res: Response) {
    try {

        const token = req.cookies.token

        if(!token) {
            res.status(401).json({
                error: "La sesion expiró."
            })
            return
        }

        const tokenDecodificado = await authService.decodificarToken(token)

        const {id} = tokenDecodificado

        const mesaId = Number(req.params.id)

        if (isNaN(mesaId)) {
            res.status(400).json({ 
                error: "El ID tiene que ser un numero." 
            })
            return
        }

        const mesaReservada = await mesaService.reservarMesa(mesaId, id)
        res.status(200).json({
            message: "Mesa reservada correctamente.",
            data: {
                id:  mesaReservada.id,
                estado: mesaReservada.estado
            }
        })
    } catch (error: any) {

        console.log(ErrorMessage() + error.message)
        if(error.message == "La mesa no esta disponible para ser reservada.") {
            res.status(409).json({
                error: error.message
            })
        } else {
            res.status(404).json({
                error: error.message
            })
        }
        
    }
}