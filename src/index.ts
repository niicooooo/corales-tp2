import "dotenv/config"

import express from 'express'
import { usuarioRouter } from "./routers/usuarioRouter"
import { mesaRouter } from "./routers/mesaRouter"
import cookieParser from "cookie-parser"
import { menuRouter } from "./routers/menuRouter"
import { pedidoRouter } from "./routers/pedidoRouter"
import { platoRouter } from "./routers/platoRouter"

const app = express()
const port = Number(process.env.PORT) || 8080

app.use(express.json())
app.use(cookieParser())

app.use('/usuario', usuarioRouter)

app.use('/mesa', mesaRouter)

app.use('/menu', menuRouter)

app.use('/pedido', pedidoRouter)

app.use('/plato', platoRouter)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})