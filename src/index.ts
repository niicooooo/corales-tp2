import "dotenv/config"

import express from 'express'
import { clienteRouter } from "./routers/clienteRouter"

const app = express()
const port = Number(process.env.PORT) || 8080

app.use(express.json())

app.use('/cliente', clienteRouter)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})