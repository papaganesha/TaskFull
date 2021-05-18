var express = require('express');
var dbConn = require('../database/config');
var tarefasController = require('../controllers/TarefasController');

var router = express.Router();
var app = express()



router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.listar_porID);
router.get('/:"nome"', tarefasController.listar_porNome);
router.post('/add', tarefasController.adicionar_tarefa);
router.put('/alterar/:id', tarefasController.alterar_tarefa);
router.delete('/deletar/:id', tarefasController.deletar_tarefa);

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('ROTA DE TAREFAS REQUISITADA')
  console.log('Time: ', Date.now());
  next();
});



// define the home page route

module.exports = router;