import { EstadoMesa } from "@prisma/client";
import { db } from "../db/db"
export class MesaService {

    async getMesasDisponibles() {

        const mesasDisponibles = await db.mesa.findMany({
            where: {
                estado: EstadoMesa.DISPONIBLE,
                activa: true
            },
            select: {
                id: true,
                estado: true
            }
        })

        if(mesasDisponibles.length == 0) {
            throw new Error("No hay ninguna mesa disponible.")
        }

        return mesasDisponibles;
    }

    async liberarMesa(mesaId: number) {

        const mesa = await db.mesa.findFirst({
            where: {
                id: mesaId
            }
        })

        if(!mesa) {
            throw new Error("No se encontro la mesa con id: " + mesaId)
        }

        if (!mesa.activa) {
            throw new Error("La mesa esta inactiva.")
        }

        if(mesa.estado == "DISPONIBLE") {
            throw new Error("La mesa ya esta liberada.")
        }

        const usuario = await db.usuario.findFirst({
            where: {
                mesaReservadaId: mesaId
            }
        })

        if (usuario) {
            await db.usuario.update({
                where: {
                    id: usuario.id
                },
                data: {
                    mesaReservada: {
                        disconnect: true
                    }
                }
            })
        }

        const mesaModificada = await db.mesa.update({
            where: {
                id: mesaId
            },
            data: {
                estado: EstadoMesa.DISPONIBLE
            }
        })

        return mesaModificada
    }

    async reservarMesa(mesaId: number, usuarioId: string) {

        const mesa = await db.mesa.findUnique({
            where: { 
                id: mesaId 
            }
        })

        if (!mesa) {
            throw new Error("La mesa con ID " + mesaId + " no existe.")
        }

        if (!mesa.activa) {
            throw new Error("La mesa esta inactiva, por ende no puede reservarse.")
        }

        if (mesa.estado !== EstadoMesa.DISPONIBLE) {
            throw new Error("La mesa no esta disponible para ser reservada.")
        }

        const usuario = await db.usuario.findUnique({
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            throw new Error("No se encontro al usuario con Id: " + usuarioId)
        }

        if(usuario.mesaReservadaId) {
            throw new Error("El usuario ya tiene una mesa reservada.")
        }

        await db.usuario.update({
            where: {
                id: usuarioId
            },
            data: {
                mesaReservada: {
                    connect: {
                        id: mesaId
                    }
                }
            }
        })

        const mesaModificada = await db.mesa.update({
            where: {
                id: mesaId
            },
            data: {
                estado: EstadoMesa.RESERVADA
            }
        })

        return mesaModificada

    }

    async crearMesa() {

        const cantidadMesas = await db.mesa.count({})

        if (cantidadMesas >= 15) {
            throw new Error("No se pueden crear mas mesas. Limite alcanzado (15).");
        }

        const mesa = await db.mesa.create({
            data: {}
        })

        return mesa

    }

    async eliminarMesa(mesaId: number) {

        const mesa = await db.mesa.findFirst({
            where: {
                id: mesaId
            }
        })

        if(!mesa) {
            throw new Error("No se encontro la mesa con el id: " + mesaId)
        }

        const mesaEliminada = await db.mesa.update({
            where: {
                id: mesaId
            },
            data: {
                activa: false
            }
        })

        return mesaEliminada

    }

}