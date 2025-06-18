export interface registerClienteBody {
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    contraseña: string
}

export interface loginClienteBody {
    correo: string,
    contraseña: string
}

export interface reservarMesaBody {
    id: number
}