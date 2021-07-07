import { Router } from "express";
import cors from "cors";
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
  busca_nomeTarefa as busca_TarefaPorNome,
  create as createTask,
  update as updateTask,
  del as deleteTask,
  switchStatus as switchStatusI
} from "../controllers/TarefasController.js";

import {
  update as updatePerfil,
  item as indexPerfil,

} from "../controllers/PerfilController.js";

import {
  register as registerUser,
  auth as userLogin,
} from "../controllers/AuthController.js";

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'

var routerApi = Router();

routerApi.use(cookieParser())

routerApi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header('Access-Control-Expose-Headers', 'x-access-token') 
  res.header('Access-Control-Accept-Headers', 'x-access-token')
  next();
});





const checkJWT1 = (req, res, next) => { 
  console.log(req.cookies["x-access-token"])
  next() 
}


//MIDLEWARE CHECK JWT
const checkJWT = (req, res, next) => {
    if (req.cookies["x-access-token"]) {
      let token = req.cookies['x-access-token']
      const decoded = jwt.verify(token, 'RUTHLESS' ,(error, result)=>{
          if(error) {
            console.log("error");
            return res.redirect('/');
          }
          else{
            req.decoded = result
            req.token = token
          }
      })
      next()
     }
     else{
       console.log("error");
       return res.redirect('/');
    }
}




//LIST ROUTES
routerApi.get("/v1/api/index/list", checkJWT, indexList)
routerApi.get("/v1/api/list/", checkJWT, busca_listaPorNome)
routerApi.get("/v1/api/index/listperUser", checkJWT, indexList_perUser)
routerApi.get("/v1/api/item/list/:id", checkJWT, itemList)
routerApi.post("/v1/api/create/list", checkJWT, createList)
routerApi.put("/v1/api/update/list/:id", checkJWT, updateList)
routerApi.delete("/v1/api/delete/list/:id", checkJWT, deleteList)

//TASK ROUTES
routerApi.get("/v1/api/index/task", checkJWT, indexTask)
routerApi.get("/v1/api/item/task/:id", checkJWT, itemTask)
routerApi.get("/v1/api/task/", checkJWT, busca_TarefaPorNome)
routerApi.get("/v1/api/list/tasks/:id", indexTarefasListaX)
routerApi.post("/v1/api/create/task", checkJWT, createTask)
routerApi.put("/v1/api/update/task/:id", checkJWT, updateTask)
routerApi.put("/v1/api/update/task", checkJWT, switchStatusI)
routerApi.delete("/v1/api/delete/task/:id", checkJWT, deleteTask);


//PERFIL ROUTES
routerApi.post("/v1/api/index/perfil", checkJWT, indexPerfil);
routerApi.put("/v1/api/index/perfil", checkJWT, updatePerfil);


//AUTH ROUTES
routerApi.post("/v1/api/auth/register", registerUser);
routerApi.post("/v1/api/auth/login", userLogin);

export default routerApi;
