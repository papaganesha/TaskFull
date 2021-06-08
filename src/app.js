import express from "express";
import cors  from "cors";
const app = express()
const port = 3000
import router from "./routes/routesApi.js";

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
