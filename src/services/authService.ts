import jwt from "jsonwebtoken"

const secret_key = process.env.SECRET_KEY

type JsonWebTokenBody = {
  id: string
  rol: string
  direccion: string
}

export class AuthService {
    async decodificarToken(token: string) {
        try {
            const decodificado = jwt.verify(token, secret_key) as JsonWebTokenBody
            return decodificado
        } catch (error) {
            throw new Error("Token invalido.")
        }
    }

    async generarJsonWebAccessToken(usuario: JsonWebTokenBody) {
        try {
            const token = jwt.sign({ id: usuario.id, rol: usuario.rol, direccion: usuario.direccion }, secret_key, { expiresIn: '1h' })
            return token
        } catch (error) {
            console.error(error);
            throw new Error("Error al generar el token.")
        }
    }
}