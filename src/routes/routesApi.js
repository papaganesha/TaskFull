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



//LIST ROUTES
routerApi.get("/v1/api/index/list", indexList);
routerApi.post("/v1/api/list", busca_listaPorNome);
routerApi.get("/v1/api/index/listperUser", indexList_perUser);
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
