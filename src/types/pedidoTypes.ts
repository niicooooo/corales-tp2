import { EstadoPedido } from "@prisma/client";

export interface getEstadoPedidoByIdBody {
    id: string
}

export interface cambiarEstadoPedidoBody {
  id: string,
  estado: EstadoPedido
}

export interface crearPedidoBody {
  platos: {
    platoId: number,
    cantidad: number
  }[]
}