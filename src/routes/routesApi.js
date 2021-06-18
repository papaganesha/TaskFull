import { Router } from "express";
//import timeLog from '../shared/middleware/timelogMiddleware'



import {
  index as indexList,
  index_codUsuario as indexList_perUser,
  item as itemList,
  create as createList,
  update as updateList,
  del as deleteList,
} from "../controllers/ListasController.js";

import {
  index as indexTask,
  index_codLista as indexTarefasUserX,
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

var router = Router();

// router.use(timeLog())


//LIST ROUTES
router.get("/v1/api/index/list", indexList);
router.post("/v1/api/index/listperUser", indexList_perUser);
router.get("/v1/api/item/list/:id", itemList);
router.post("/v1/api/create/list", createList);
router.put("/v1/api/update/list/:id", updateList);
router.delete("/v1/api/delete/list/:id", deleteList);

//TASK ROUTES
router.get("/v1/api/index/task", indexTask);
router.get("/v1/api/item/task/:id", itemTask);
router.get("/v1/api/list/tasks/:id", indexTarefasUserX);

router.post("/v1/api/create/task", createTask);
router.put("/v1/api/update/task/:id", updateTask);
router.delete("/v1/api/delete/task/:id", deleteTask);


//PERFIL ROUTES
router.post("/v1/api/index/perfil/", indexPerfil);
router.put("/v1/api/index/perfil", updatePerfil);


//AUTH ROUTES
router.post("/v1/api/auth/register", registerUser);
router.post("/v1/api/auth/login", userLogin);

export default router;
