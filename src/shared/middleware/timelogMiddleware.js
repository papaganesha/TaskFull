export function timeLog(req, res, next) {
    console.log('ROTA DE TAREFAS REQUISITADA')
    console.log('Time: ', Date.now());
    next();
};