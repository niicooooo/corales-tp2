import { AuthService } from "../services/authService";

const authService = new AuthService()

export async function autenticarAdmin(token: string) {

    if(!token) {
        throw new Error("La sesion expiró.")
    }

    const tokenDecodificado = await authService.decodificarToken(token)

    const {rol} = tokenDecodificado

    if(rol == "CLIENTE") {
        throw new Error("No tiene los permisos necesarios.")
    }
}