import express from "express";
const app = express();
const port = 3000;
import router from "./routes/routesApi.js";

console.log("oi");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.get("/", (_req, res) => {
  res.status(200).json({
    msg: "Bem vindo a API Taskfull",
  });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
