import {
  execute
} from "../database/config.js";

import {token} from "/AuthController.js"

export function index(req, res, next){
       if(token){
        execute("SELECT * FROM TAREFA").then((result) => {
            if(result.length > 0) {
             const response = {
                 quantidade: result.length,
                 tarefas: result.map((task => {
                     return {
                         cod_lista : task.cod_lista,
                         cod_tarefa: task.cod_tarefa,
                         nome: task.nome_tarefa,
                         categoria: task.descricao,
                         request: {
                             tipo: 'GET',
                             descricao: 'Retorna as Tarefas cadastradas'
                         }
                     }
                 }))
             }
             return res.status(200).send(response)
             next()
            }else{
              return res.status(500).send({ msg: 'Tabela de Tarefas vazia'})
            }
         }).catch((error) => {
             const response = {
                 msg : error, 
                 request: {
                     tipo: 'GET',
                     descricao: 'Erro durante operação de GET'
                 }
             }
             return res.status(500).send(response)
             next()
         })
       }else{
        const response = {
            msg : 'Somente usuario autenticado pode acessar', 
            request: {
                tipo: 'GET',
                descricao: 'Erro durante operação de GET'
            }
        }
        return res.status(500).send(response)
       }
}
export function item(req, res, next){
    var id = +req.params.id
    if (id && id != NaN && req) {
        execute("SELECT * FROM TAREFA WHERE COD_TAREFA = ?;", [id]).then((result) => {
        if(result.length > 0){    
            const response = {
              tarefa: result.map((task => {
                return {
                  cod_lista : task.cod_lista,
                  cod_tarefa: task.cod_tarefa,
                  nome: task.nome_tarefa,
                  categoria: task.descricao,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna a Tarefa de ID requerido'
                    }
                    }
                }))
            }
                return res.status(201).send(response)
                next()
                }
                else{
                    const response = {
                        msg : `Tarefa de ID(${id}) não existe`, 
                        request: {
                            tipo: 'GET',
                            descricao: 'Erro durante operação de GET'
                        }
                    }
                    return res.status(500).send(response)
                    next()
                }
        }).catch((error) => {
            const response = {
                msg : error, 
                request: {
                    tipo: 'GET',
                    descricao: 'Erro durante operação de GET'
                }
            }
            return res.status(500).send(response)
            next()
        })
    } else {
        const response = {
            msg : 'ID nao inserido ou não numerico', 
            request: {
                tipo: 'GET',
                descricao: 'Erro durante operação de GET'
            }
        }
        return res.status(500).send(response)
    }

}



export function create (req, res, next){
    var cod_lista = req.body.cod_lista
    var nomeTarefa = req.body.nome
    var descTarefa = req.body.descricao
    if (cod_lista && nomeTarefa && descTarefa) {
            execute("INSERT INTO TAREFA(COD_LISTA, NOME_TAREFA, DESCRICAO) VALUES(?, ?, ?);", [cod_lista, nomeTarefa.toUpperCase(), descTarefa.toUpperCase()]).then((result) => {
            const response = {
                msg: `${nomeTarefa} cadastrada com sucesso`,
                cod_tarefa: result.insertId,
                request: {
                    tipo: 'POST',
                    descricao: 'Cadastro de Tarefas'
                }
            }
            return res.status(201).send(response)
            next()
        }).catch((error) => {
            const response = {
                msg : error, 
                request: {
                    tipo: 'POST',
                    descricao: 'Erro durante operação de POST'
                }
            }
            return res.status(500).send(response)
            next()
        })
    }
    else {
        const response = {
            msg: 'Necessario informar nome e descricao para cadastro de Tarefas', 
            request: {
                tipo: 'POST',
                descricao: 'Erro durante operação de POST'
            }
        }
        return res.status(500).send(response)
    }
}


export function update(req, res, next){
    var id = +req.params.id
    var nomeTarefa = req.body.nome
    var descTarefa = req.body.descricao
    if (id && id != NaN && req) {
        if (nomeTarefa && descTarefa) {
                execute("UPDATE TAREFAS SET NOME_TAREFA = ?,  DESCRICAO =  ? WHERE COD_TAREFA = ?;", [nomeTarefa.toUpperCase(), descTarefa.toUpperCase() , id]).then((result) => {
                if(result.affectedRows > 0){    
                    const response = {
                        msg: `Nome e categoria da Tarefa de ID(${id}) editados com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Tarefas'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                    }
                    else{
                        const response = {
                            msg: `Tarefa de ID(${id}) não existe`, 
                            request: {
                                tipo: 'POST',
                                descricao: 'Erro durante operação de POST'
                            }
                        }
                        return res.status(500).send(response)
                        next()
                    }
            }).catch((error) => {
                const response = {
                    msg : error, 
                    request: {
                        tipo: 'POST',
                        descricao: 'Erro durante operação de POST'
                    }
                }
                return res.status(500).send(response)
                next()
            })
        }

        else if (nomeTarefa) {
                execute("UPDATE TAREFA SET NOME_TAREFA = ? WHERE COD_LISTA = ?;", [nomeTarefa.toUpperCase(), id]).then((result) => {
                if(result.affectedRows > 0){    
                const response = {
                    msg: `Nome da Tarefa de ID(${id}) editado com sucesso`,
                    request: {
                        tipo: 'PUT',
                        descricao: 'Edição de Tarefas'
                    }
                }
                return res.status(201).send(response)
                next()
                }
                else{
                    return res.status(500).send({ msg: `Tarefa de ID(${id}) não existe` })
                    next()
                }
                
            }).catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

        }

        else {
                execute("UPDATE LISTA_TAREFAS SET DESCRICAO = ? WHERE COD_TAREFA = ?;", [descTarefa.toUpperCase(), id]).then((result) => {
                if(result.affectedRows > 0){    
                    const response = {
                        msg: `Descricao da Lista de ID(${id}) editada com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Tarefas'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                    }
                    else{
                        const response = {
                            msg : `Tarefa de ID(${id}) não existe`, 
                            request: {
                                tipo: 'PUT',
                                descricao: 'Erro durante operação de PUT'
                            }
                        }
                        return res.status(500).send(response)
                        next()
                    }
            }).catch((error) => {
                const response = {
                    msg : error, 
                    request: {
                        tipo: 'PUT',
                        descricao: 'Erro durante operação de PUT'
                    }
                }
                return res.status(500).send(response)
                next()
            })
        }

    }

    else {
        const response = {
            msg : 'ID não inserido ou não numerico', 
            request: {
                tipo: 'PUT',
                descricao: 'Erro durante operação de PUT'
            }
        }
        return res.status(500).send(response)
}
}

export function del(req, res, next){
    var id = +req.params.id
    if(id && id != NaN && req){
            execute("DELETE FROM TAREFA WHERE COD_TAREFA = ?;", [id]).then((result) => {
            const response = {
                msg: `Tarefa de ${id} deletada com sucesso`,
                request: {
                    tipo: 'POST',
                    descricao: 'Delete de Tarefas'
                }
            }
            return res.status(201).send(response)
            next()
        }).catch((error) => {
            const response = {
                msg : error, 
                request: {
                    tipo: 'DELETE',
                    descricao: 'Erro durante operação de DELETE'
                }
            }
            return res.status(500).send(response)
            next()
        })
    }else{
        const response = {
            msg : 'ID não inserido ou não numerico', 
            request: {
                tipo: 'DELETE',
                descricao: 'Erro durante operação de DELETE'
            }
        }
        return res.status(500).send(response)
    }
   
}