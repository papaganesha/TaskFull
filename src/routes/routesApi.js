import { Router } from 'express';
// import timeLog from '../shared/middleware/timelogMiddleware'

import { index, item, create, update, del } from '../controllers/ListasController.js';
// import { index, item, create, update, del } from '../controllers/TarefasController';

var router = Router();
// router.use(timeLog())
//LIST ROUTES
router.get('/v1/api/index/list', index);
router.get('/v1/api/item/list/:id', item);
router.post('/v1/api/create/list', create);
router.put('/v1/api/update/list/:id', update);
router.delete('/v1/api/delete/list/:id', del);
//TASK ROUTES
// router.get('/v1/api/index/task', index);
// router.get('/v1/api/item/task/:id', item);
// router.post('/v1/api/create/task', create);
// router.put('/v1/api/update/task/:id', update);
// router.delete('/v1/api/delete/task/:id', del);

export default router;