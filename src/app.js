import express from "express"
import cors  from "cors"
import path from "path"

const app = express()
const port = 3000
import routerApi from "./routes/routesApi.js";
import routerFront from "./routes/routesFront.js";


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(express.static("./" + 'public'));
app.set('views', path.join('./', 'public'))
app.set('view engine', 'ejs')





app.use(routerApi)

app.use(routerFront)




app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
