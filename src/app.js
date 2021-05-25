import express from "express";
const app = express();
const port = 3000;
import router from './routes/routesApi.js'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(port , () => console.log(`Servidor rodando na porta ${port}`));