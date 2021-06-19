import { Router } from "express"


var routerFront = Router();



//ROTAS DE AUTH
routerFront.get('/', function(req, res, next) { //LOGIN
    res.render('index');
});

routerFront.get('/cadastro', function(req, res, next) {
    res.render('cadastro');
});


//ROTAS DE ERRO
routerFront.get('/401', function(req, res, next) {
    res.render('401');
});



//ROTAS DE LISTAS
routerFront.get('/listas', function(req, res, next) {
    res.render('listas');
});


routerFront.get('/adicionarLista', function(req, res, next) {
    res.render('adicionarLista');
});

routerFront.get('/editarLista', function(req, res, next) {
    res.render('editarLista');
});



//ROTAS DE TAREFAS
routerFront.get('/tarefas', function(req, res, next) {
    res.render('tarefas');
});

routerFront.get('/adicionarTarefa', function(req, res, next) {
    res.render('adicionarTarefa');
});

routerFront.get('/editarTarefa', function(req, res, next) {
    res.render('editarTarefa');
});


//ROTAS DE PERFIL
routerFront.get('/perfil', function(req, res, next) {
    res.render('perfil');
});

routerFront.get('/editarPerfil', function(req, res, next) {
    res.render('editarPerfil');
});






export default routerFront;