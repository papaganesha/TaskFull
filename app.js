var express = require('express');
var app = express();
var port = 3000



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Rotas
const listasRouter = require('./routes/ListasRouter')
app.use('/api/listas' , listasRouter)

const tarefasRouter = require('./routes/TarefasRouter')
app.use('/api/tarefas' , tarefasRouter)



app.listen(port , () => console.log(`Servidor rodando na porta ${port}`));