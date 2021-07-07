import {
    execute
} from "../database/config.js";


export function index(req, res, next) {
    execute("SELECT * FROM TAREFA").then((result) => {
        if (result.length > 0) {
            const response = {
                tarefa: result.map((task => {
                    return {
                        cod_lista: task.cod_lista,
                        cod_tarefa: task.cod_tarefa,
                        nome_tarefa: task.nome_tarefa,
                        descricao: task.descricao,
                        data_entrada: task.data_entrada,
                        data_ultima_alteracao: task.data_ultima_alteracao,
                        statusTarefa: task.statusTarefa,
                        data_termino: task.data_termino
                    }
                }))
            }
            return res.status(200).send(response)
            next()
        }
        else {
            return res.status(500).send({ msg: 'Tabela de Tarefas vazia' })
        }
    })
        .catch((error) => {
           
            return res.status(500).send({ msg: error.sqlMessage})
            next()
        })

}

export function busca_nomeTarefa(req, res, next){
    var { nome, cod_lista } = req.query
    const query =`SELECT * FROM TAREFA WHERE NOME_TAREFA LIKE '%${nome}%' AND COD_LISTA = ?;`
    execute(query ,[ cod_lista ]).then((result) => {
        if (result.length > 0) {
            const response = {
                tarefa: result.map((task => {
                    return {
                        cod_lista: task.cod_lista,
                        cod_tarefa: task.cod_tarefa,
                        nome_tarefa: task.nome_tarefa,
                        descricao: task.descricao,
                        data_entrada: task.data_entrada,
                        data_ultima_alteracao: task.data_ultima_alteracao,
                        statusTarefa: task.statusTarefa,
                        data_termino: task.data_termino
                    }
                }))
                
            }
            return res.status(200).send(response)
            next()
        }
        else {
            return res.status(404).send({ msg: `Nenhuma Lista para pesquisa: ${nomeLista}` })
        }
    }).catch((error) => {
        return res.status(404).send({msg : error})
        next()
    })
}

export function switchStatus(req, res, next){
    var { statusTarefa , cod_tarefa } = req.body
    statusTarefa = parseInt(statusTarefa)
    var msg = ""
    if( statusTarefa == 0){
        statusTarefa = 1
        msg = "Tarefa completada"
    }
    else if( statusTarefa == 1){
        statusTarefa = 0
        msg = "Tarefa reiniciada"
    }

    cod_tarefa = parseInt(cod_tarefa)
    const query =`UPDATE TAREFA SET statusTarefa = ? WHERE COD_TAREFA = ?;`
    execute(query ,[ statusTarefa, cod_tarefa ]).then((result) => {
        if (result.affectedRows > 0) {
            return res.status(200).send({msg : msg })
            next()
        }
        else {
            return res.status(404).send({ msg: `Erro durante switch` })
        }
    }).catch((error) => {
        return res.status(404).send({msg : error.sqlMessage})
        next()
    })
}


export async function index_codLista(req, res, next) {
        var cod_lista = req.params.id
        const query = "SELECT * FROM TAREFA WHERE COD_LISTA = ?;"
        await execute(query, [cod_lista])
            .then((result) => {
                if (result.length > 0) {
                    const response = {
                        tarefa: result.map((task => {
                            return {
                                cod_lista: task.cod_lista,
                                cod_tarefa: task.cod_tarefa,
                                nome_tarefa: task.nome_tarefa,
                                descricao: task.descricao,
                                data_entrada: task.data_entrada,
                                statusTarefa: task.statusTarefa,
                                data_ultima_alteracao: task.data_ultima_alteracao
                            }
                        }))

                    }
                    return res.status(200).send(response)
                    next()
                }
                else {
                    return res.status(500).send({ msg: 'Lista sem tarefas' })
                }
            }).catch((error) => {
                return res.status(500).send({msg: error})
                next()
            })
    }





export function item(req, res, next) {
        var id = +req.params.id
        if (id && id != NaN && req) {
            execute("SELECT * FROM TAREFA WHERE COD_TAREFA = ?;", [id]).then((result) => {
                if (result.length > 0) {
                    const response = {
                        cod_lista: result[0].cod_lista,
                        cod_tarefa: result[0].cod_tarefa,
                        nome_tarefa: result[0].nome_tarefa,
                        descricao: result[0].descricao,
                        data_entrada: result[0].data_entrada,
                        data_ultima_alteracao: result[0].data_ultima_alteracao,
                        statusTarefa: result[0].statusTarefa,
                        data_termino: result[0].data_termino
                    }


                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Tarefa não existe`,
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
                    msg: error,
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
                msg: 'ID nao inserido ou não numerico',
                request: {
                    tipo: 'GET',
                    descricao: 'Erro durante operação de GET'
                }
            }
            return res.status(500).send(response)
        }

    }



    export function create(req, res, next) {
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
                    msg: error,
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


    export function update(req, res, next) {
        var id = +req.params.id
        var nomeTarefa = req.body.nome
        var descTarefa = req.body.descricao
        if (id && id != NaN && req) {
            if (nomeTarefa && descTarefa) {
                execute("UPDATE TAREFA SET NOME_TAREFA = ?,  DESCRICAO =  ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_TAREFA = ?;", [nomeTarefa.toUpperCase(), descTarefa.toUpperCase(), id]).then((result) => {
                    if (result.affectedRows > 0) {
                        const response = {
                            msg: `Nome e categoria da Tarefa editados com sucesso`,
                            request: {
                                tipo: 'PUT',
                                descricao: 'Edição de Tarefas'
                            }
                        }
                        return res.status(201).send(response)
                        next()
                    }
                    else {
                        const response = {
                            msg: `Tarefa não existe`,
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
                        msg: error,
                        request: {
                            tipo: 'POST',
                            descricao: 'Erro durante operação de PUT'
                        }
                    }
                    return res.status(500).send(response)
                    next()
                })
            }

            else if (nomeTarefa) {
                execute("UPDATE TAREFA SET NOME_TAREFA = ? WHERE COD_TAREFA = ?;", [nomeTarefa.toUpperCase(), id]).then((result) => {
                    if (result.affectedRows > 0) {
                        const response = {
                            msg: `Nome da Tarefa editado com sucesso`,
                            request: {
                                tipo: 'PUT',
                                descricao: 'Edição de Tarefas'
                            }
                        }
                        return res.status(201).send(response)
                        next()
                    }
                    else {
                        return res.status(500).send({ msg: `Tarefa de ID(${id}) não existe` })
                        next()
                    }

                }).catch((error) => {
                    return res.status(500).send({ error: error })
                    next()
                })

            }

            else if (descTarefa) {
                execute("UPDATE TAREFA SET DESCRICAO = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_TAREFA = ?;", [descTarefa.toUpperCase(), id]).then((result) => {
                    if (result.affectedRows > 0) {
                        const response = {
                            msg: `Descricao da Lista editada com sucesso`,
                            request: {
                                tipo: 'PUT',
                                descricao: 'Edição de Tarefas'
                            }
                        }
                        return res.status(201).send(response)
                        next()
                    }
                    else {
                        const response = {
                            msg: `Tarefa não existe`,
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
                        msg: error,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Erro durante operação de PUT'
                        }
                    }
                    return res.status(500).send(response)
                    next()
                })
            }
            else {
                const response = {
                    msg: `É necessario informar os campos de alteração`,
                    request: {
                        tipo: 'PUT',
                        descricao: 'Erro durante operação de PUT'
                    }
                }
                return res.status(500).send(response)
            }

        }

        else {
            const response = {
                msg: 'ID não inserido ou não numerico',
                request: {
                    tipo: 'PUT',
                    descricao: 'Erro durante operação de PUT'
                }
            }
            return res.status(500).send(response)
        }
    }

    export function del(req, res, next) {
        var id = +req.params.id
        if (id && id != NaN && req) {
            execute("DELETE FROM TAREFA WHERE COD_TAREFA = ?;", [id]).then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Tarefa deletada com sucesso`,
                        request: {
                            tipo: 'DELETE',
                            descricao: 'Delete de Tarefas'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Tarefa não existe`,
                        request: {
                            tipo: 'DELETE',
                            descricao: 'Erro durante operação de DELETE'
                        }
                    }
                    return res.status(500).send(response)
                    next()
                }

            }).catch((error) => {
                const response = {
                    msg: error,
                    request: {
                        tipo: 'DELETE',
                        descricao: 'Erro durante operação de DELETE'
                    }
                }
                return res.status(500).send(response)
                next()
            })
        } else {
            const response = {
                msg: 'ID não inserido ou não numerico',
                request: {
                    tipo: 'DELETE',
                    descricao: 'Erro durante operação de DELETE'
                }
            }
            return res.status(500).send(response)
        }

    }
