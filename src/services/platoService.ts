import { db } from "../db/db"
import { crearPlatoBody, eliminarPlatoBody } from "../types/platoTypes";
import { ErrorMessage } from "../utils/mensajes";
import { Decimal } from "@prisma/client/runtime/library"

export class PlatoService {
    async crearPlato(body: crearPlatoBody) {
        try {

            const plato = await db.plato.create({
                data: {
                    ...body,
                    precio: new Decimal(body.precio)
                }
            })

            return plato;

        } catch (error: any) {

            console.log("Error creando usuario: ", body)
            console.log(ErrorMessage() + error.message);
            throw new Error("Error al crear usuario. Mira los logs para más información.")
        
        }
    }
    
    async eliminarPlato(body: eliminarPlatoBody) {
        try {
            
            const platoEliminado = await db.plato.update({
                where: {
                    id: body.id
                }, 
                data: {
                    activo: false
                }
            })

            return platoEliminado;

        } catch (error) {
            
        }
    }
}