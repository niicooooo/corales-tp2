import { db } from "../db/db"
import { crearPlatoBody, eliminarPlatoBody } from "../types/platoTypes";
import { ErrorMessage } from "../utils/mensajes"
import { eliminarMesaBody, modificarEstadoMesaBody } from "../types/mesaTypes";
import { MesaService } from "./mesaService";
import { PlatoService } from "./platoService";
import { PedidoService } from "./pedidoService";
import { getEstadoPedidoBody } from "../types/pedidoTypes";


export class AdminService {

    private mesaService = new MesaService()
    private platoService = new PlatoService()
    private pedidoService = new PedidoService()

    async crearPlato(body: crearPlatoBody) {
        try {

            const plato = await this.platoService.crearPlato(body)

            return plato;

        } catch (error: any) {

            console.log("Error creando el plato: ", body)
            console.log(ErrorMessage() + error.message);
            throw new Error("Error al crear el plato. Mira los logs para más información.")
        
        }
    }

    async eliminarPlato(body: eliminarPlatoBody) {
        try {
            
            const platoEliminado = await this.platoService.eliminarPlato(body)

            return platoEliminado;

        } catch (error: any) {
            
            console.log("Error eliminando el plato: ", body)
            console.log(ErrorMessage() + error.message);
            throw new Error("Error al eliminar el plato. Mira los logs para más información.")

        }
    }

    async crearMesa() {
        try {
            
            const mesa = await this.mesaService.crearMesa()

            return mesa;

        } catch (error) {
            
        }
    }

    async modificarEstadoMesa(mesaId: modificarEstadoMesaBody) {
        try {

            const mesaModificada = await this.mesaService.cambiarEstadoMesaDisponible(mesaId)

            return mesaModificada;

        } catch (error) {
            
        }
    }

    async eliminarMesa(mesaId: eliminarMesaBody) {
        try {

            const mesaEliminada = await this.mesaService.eliminarMesa(mesaId)

            return mesaEliminada;

        } catch (error) {
            
        }
    }

    async verMesasDisponibles() {
        try {
            
            const mesasDisponibles = await this.mesaService.getMesasDisponibles()
            
            return mesasDisponibles;

        } catch (error) {
            
        }
    }

    async verEstadoDelPedido(pedidoId: getEstadoPedidoBody) {
        try {
            
            const estado = await this.pedidoService.getEstadoPedido(pedidoId)

            return estado;

        } catch (error) {
            
        }
    }
}