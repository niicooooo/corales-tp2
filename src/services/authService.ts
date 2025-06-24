import jwt from "jsonwebtoken"

const secret_key = process.env.SECRET_KEY

type JsonWebTokenBody = {
  id: string;
  rol: string;
}

export class AuthService {
    async decodificarToken(token: string) {
        try {

            if(!token) {
                throw new Error()
            }

            const decodificado = jwt.verify(token, secret_key) as JsonWebTokenBody
            return decodificado
        } catch (error) {
            throw new Error("Token invalido.")
        }
    }

    async generarJsonWebAccessToken(user: JsonWebTokenBody) {
        try {
            const token = jwt.sign({ id: user.id, rol: user.rol }, secret_key, { expiresIn: '1h' })
            return token
        } catch (error) {
            console.error(error);
            throw new Error("Error al generar el token.")
        }
    }
}