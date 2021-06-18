import { Router } from "express"


var router = Router();



//ROTAS DE AUTH
router.get('/', function(req, res, next) { //LOGIN
    res.render('index');
});

router.get('/cadastro', function(req, res, next) {
    res.render('cadastro');
});


//ROTAS DE ERRO
router.get('/401', function(req, res, next) {
    res.render('401');
});



//ROTAS DE LISTAS
router.get('/listas', function(req, res, next) {
    res.render('listas');
});


router.get('/adicionarLista', function(req, res, next) {
    res.render('adicionarLista');
});

router.get('/editarLista', function(req, res, next) {
    res.render('editarLista');
});



//ROTAS DE TAREFAS
router.get('/tarefas', function(req, res, next) {
    res.render('tarefas');
});

router.get('/adicionarTarefa', function(req, res, next) {
    res.render('adicionarTarefa');
});

router.get('/editarTarefa', function(req, res, next) {
    res.render('editarTarefa');
});


//ROTAS DE PERFIL
router.get('/perfil', function(req, res, next) {
    res.render('perfil');
});

router.get('/editarPerfil', function(req, res, next) {
    res.render('editarPerfil');
});






export default router;