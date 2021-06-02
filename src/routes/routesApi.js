import { Router } from "express";
// import timeLog from '../shared/middleware/timelogMiddleware'

import {
  index as indexList,
  item as itemList,
  create as createList,
  update as updateList,
  del as deleteList,
} from "../controllers/ListasController.js";

import {
  index as indexTask,
  item as itemTask,
  create as createTask,
  update as updateTask,
  del as deleteTask,
} from "../controllers/TarefasController.js";

import {
  register as registerUser,
  auth as userLogin,
} from "../controllers/AuthController.js";

var router = Router();
// router.use(timeLog())
//LIST ROUTES
router.get("/v1/api/index/list", indexList);
router.get("/v1/api/item/list/:id", itemList);
router.post("/v1/api/create/list", createList);
router.put("/v1/api/update/list/:id", updateList);
router.delete("/v1/api/delete/list/:id", deleteList);
//TASK ROUTES
router.get("/v1/api/index/task", indexTask);
router.get("/v1/api/item/task/:id", itemTask);
router.post("/v1/api/create/task", createTask);
router.put("/v1/api/update/task/:id", updateTask);
router.delete("/v1/api/delete/task/:id", deleteTask);


//AUTH ROUTES
router.post("/v1/api/auth/register", registerUser);
router.post("/v1/api/auth/login", userLogin);

export default router;
