import { EstadoMesa } from "@prisma/client";
import { db } from "../db/db"
import { eliminarMesaBody, modificarEstadoMesaBody } from "../types/mesaTypes";

export class MesaService {

    async getMesasDisponibles() {

        const mesasDisponibles = await db.mesa.findMany({
            where: {
                estado: EstadoMesa.DISPONIBLE,
                activa: true
            }
        })

        if(!mesasDisponibles) {
            throw new Error("No hay ninguna mesa disponible.")
        }

        return mesasDisponibles;
    }

    async cambiarEstadoMesaDisponible(mesaId: modificarEstadoMesaBody) {

        const mesa = await db.mesa.findFirst({
            where: {
                id: mesaId.id
            }
        })

        if(!mesa) {
            throw new Error("No se encontro la mesa con id: " + mesaId.id)
        }

        const mesaModificada = await db.mesa.update({
            where: {
                id: mesaId.id
            },
            data: {
                estado: EstadoMesa.DISPONIBLE
            }
        })

        return mesaModificada;
    }

    async reservarMesa(mesaId: modificarEstadoMesaBody) {

        const mesa = await db.mesa.findUnique({
            where: { id: mesaId.id }
        });

        if (!mesa) {
            throw new Error("La mesa no existe.");
        }

        if (mesa.estado !== EstadoMesa.DISPONIBLE) {
            throw new Error("La mesa no esta disponible para ser reservada.");
        }

        const mesaModificada = await db.mesa.update({
            where: {
                id: mesaId.id
            },
            data: {
                estado: EstadoMesa.RESERVADA
            }
        })

        return mesaModificada;

    }

    async crearMesa() {

        const cantidadMesas = await db.mesa.count({
            where: {
                activa: true
            }
        });

        if (cantidadMesas >= 15) {
            throw new Error("No se pueden crear mas mesas. Limite alcanzado (15).");
        }

        const mesa = await db.mesa.create({
            data: {}
        })

        return mesa;

    }

    async eliminarMesa(mesaId: eliminarMesaBody) {

        const mesa = await db.mesa.findFirst({
            where: {
                id: mesaId.id
            }
        })

        if(!mesa) {
            throw new Error("No se encontro la mesa con el id: " + mesaId)
        }

        const mesaEliminada = await db.mesa.update({
            where: {
                id: mesaId.id
            },
            data: {
                activa: false
            }
        })

        return mesaEliminada;

    }

}