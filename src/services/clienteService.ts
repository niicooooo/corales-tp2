import { db } from "../db/db"
import { registerClienteBody, reservarMesaBody } from "../types/clienteTypes"
import { ErrorMessage } from "../utils/mensajes"
import { MesaService } from "./mesaService";
import { getEstadoPedidoBody } from "../types/pedidoTypes";
import { PedidoService } from "./pedidoService";
import { MenuService } from "./menuService";
import { getMenuByIdBody } from "../types/menuTypes";

export class ClienteService{

    private mesaService = new MesaService()
    private pedidoService = new PedidoService()
    private menuService = new MenuService()

    async crearCliente(body: registerClienteBody) {
        try {

            const cliente = await db.cliente.create({
                data: body
            })

            return cliente;

        } catch (error: any) {

            console.log("Error creando usuario: ", body)
            console.log(ErrorMessage() + error.message);
            throw new Error("Error al crear usuario. Mira los logs para más información.")
        
        }
    }

    async reservarMesa(mesaId: reservarMesaBody) {
        try {

            const mesaReservada = await this.mesaService.cambiarEstadoMesaReservada(mesaId)

            return mesaReservada;

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

    async verMenuPorId(menuId: getMenuByIdBody) {
        try {

            const platos = await this.menuService.getMenuById(menuId)

            return platos;

        } catch (error) {
            
        }
    }
}