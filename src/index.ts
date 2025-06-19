import "dotenv/config"

import express from 'express'
import { usuarioRouter } from "./routers/usuarioRouter"

const app = express()
const port = Number(process.env.PORT) || 8080

app.use(express.json())

app.use('/cliente', usuarioRouter)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})