import { EstadoMesa } from "@prisma/client";
import { db } from "../db/db"
import { eliminarMesaBody, modificarEstadoMesaBody } from "../types/mesaTypes";

export class MesaService {

    async getMesasDisponibles() {
        try {
            const mesasDisponibles = await db.mesa.findMany({
                where: {
                    estado: EstadoMesa.DISPONIBLE
                }
            })

            return mesasDisponibles;

        } catch (error) {
            
        }
    }

    async cambiarEstadoMesaDisponible(mesaId: modificarEstadoMesaBody) {
        try {
            const mesaModificada = await db.mesa.update({
                where: {
                    id: mesaId.id
                },
                data: {
                    estado: EstadoMesa.DISPONIBLE
                }
            })

            return mesaModificada;
        } catch (error) {
            
        }
    }

    async cambiarEstadoMesaReservada(mesaId: modificarEstadoMesaBody) {
        try {
            const mesaModificada = await db.mesa.update({
                where: {
                    id: mesaId.id
                },
                data: {
                    estado: EstadoMesa.RESERVADA
                }
            })

            return mesaModificada;
        } catch (error) {
            
        }
    }

    async crearMesa() {
        try {
            
            const mesa = await db.mesa.create({
                data: {}
            })

            return mesa;

        } catch (error) {
            
        }
    }

    async eliminarMesa(mesaId: eliminarMesaBody) {
        try {

            const mesaEliminada = await db.mesa.update({
                where: {
                    id: mesaId.id
                },
                data: {
                    activa: false
                }
            })

            return mesaEliminada;

        } catch (error) {
            
        }
    }

}