import { Router } from "express";
//import timeLog from '../shared/middleware/timelogMiddleware'



import {
  index as indexList,
  index_codUsuario as indexList_perUser,
  busca_nomeLista as busca_listaPorNome,
  item as itemList,
  create as createList,
  update as updateList,
  del as deleteList,
} from "../controllers/ListasController.js";

import {
  index as indexTask,
  index_codLista as indexTarefasListaX,
  item as itemTask,
  create as createTask,
  update as updateTask,
  del as deleteTask,
} from "../controllers/TarefasController.js";

import {
  update as updatePerfil,
  item as indexPerfil,

} from "../controllers/PerfilController.js";

import {
  register as registerUser,
  auth as userLogin,
} from "../controllers/AuthController.js";

var routerApi = Router();

routerApi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  //res.header('Access-Control-Allow-Credentials', "*");
  res.header('Access-Control-Expose-Headers', 'x-access-token'); //essta linha habilita o token no header
  next();
});

const checkJWT = (req, res, next)=>{
  // procurar a propriedade token em partes diferentes do pedido
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // descodificar caso haja um valor no request
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'RUTHLESS', function(err, decoded) {      
      if (err) { // erro!
        console.log("erro")    

        return res.status(403).json({ success: false, msg: 'Falha ao autenticar token JWT.' });    
      } else {
        // tudo ok! vamos passar esse valor para o req.decoded para ser usado no resto da aplicação
        //req.decoded = decoded
          console.log("sucesso")    
        next()
      }
    });

  } else {
    console.log("erro")    

    // se não houver token no pedido/request, retornar erro
    return res.status(403).send({ 
        sucess: false, 
        msg: 'Sem token JWT.' 
    })
    
  }
}


//LIST ROUTES
routerApi.get("/v1/api/index/list", indexList);
routerApi.post("/v1/api/list/", busca_listaPorNome)
routerApi.get("/v1/api/index/listperUser", indexList_perUser)
routerApi.get("/v1/api/item/list/:id", itemList);
routerApi.post("/v1/api/create/list", createList);
routerApi.put("/v1/api/update/list/:id", updateList);
routerApi.delete("/v1/api/delete/list/:id", deleteList);

//TASK ROUTES
routerApi.get("/v1/api/index/task", indexTask);
routerApi.get("/v1/api/item/task/:id", itemTask);
routerApi.get("/v1/api/list/tasks/:id", indexTarefasListaX);

routerApi.post("/v1/api/create/task", createTask);
routerApi.put("/v1/api/update/task/:id", updateTask);
routerApi.delete("/v1/api/delete/task/:id", deleteTask);


//PERFIL ROUTES
routerApi.post("/v1/api/index/perfil/", indexPerfil);
routerApi.put("/v1/api/index/perfil", updatePerfil);


//AUTH ROUTES
routerApi.post("/v1/api/auth/register", registerUser);
routerApi.post("/v1/api/auth/login", userLogin);

export default routerApi;
