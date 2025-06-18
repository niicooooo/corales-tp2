import { CategoriaPlato } from "@prisma/client";

export interface crearPlatoBody {
    nombre: string,
    descripcion: string,
    precio: string,
    categoria: CategoriaPlato,
    menuId: number
}

export interface eliminarPlatoBody {
    id: number
}