export interface getEstadoPedidoBody {
    id: string
}

export interface PedidoCompletoBody {
  clienteId: string;
  platos: {
    platoId: number;
    cantidad: number;
  }[];
}