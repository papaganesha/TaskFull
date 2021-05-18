var express = require('express');
var listasController = require('../controllers/ListasController');

var router = express.Router();
var app = express() 



router.get('/', listasController.listar);
router.get('/:id', listasController.listar_porID);
router.post('/add', listasController.adicionar_lista);
router.put('/alterar/:id', listasController.alterar_lista);
router.delete('/deletar/:id', listasController.deletar_lista);

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('ROTA DE LISTAS REQUISITADA')
  console.log('Time: ', Date.now());
  next();
});



// define the home page route

module.exports = router;