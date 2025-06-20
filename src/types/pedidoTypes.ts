import { EstadoPedido } from "@prisma/client";

export interface getEstadoPedidoBody {
    id: string
}

export interface cambiarEstadoPedidoBody {
  id: string,
  estado: EstadoPedido
}

export interface crearPedidoBody {
  platos: {
    platoId: string,
    cantidad: number
  }[]
}