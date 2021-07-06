import jwt from 'jsonwebtoken';


import {
    execute
} from "../database/config.js";




export function index(req, res, next) {
    execute("SELECT * FROM LISTA_TAREFAS;").then((result) => {
        if (result.length > 0) {
            const response = {
                lista: result.map((list => {
                    return {
                        cod_usuario: list.cod_usuario,
                        cod_lista: list.cod_lista,
                        nome_lista: list.nome_lista,
                        categoria: list.categoria,
                        data_entrada: list.data_entrada,
                        data_ultima_alteracao: list.data_ultima_alteracao
                    }
                }))
                
            }
            return res.status(200).send(response)
            next()
        }
        else {
            return res.status(500).send({ msg: 'Tabela de listas vazia' })
        }
    }).catch((error) => {
        return res.status(500).send({msg : error})
        next()
    })
}

export function index_codUsuario(req, res, next) {
    var cod_usuario = req.query.cod_usuario  
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS')
    var cod_usuario_decoded = decoded.cod_usuario
    execute("SELECT * FROM LISTA_TAREFAS where cod_usuario = ?;",[cod_usuario_decoded]).then((result) => {
        if (result.length > 0) {
            const response = {
                lista: result.map((list => {
                    return {
                        cod_usuario: list.cod_usuario,
                        cod_lista: list.cod_lista,
                        nome_lista: list.nome_lista,
                        categoria: list.categoria,
                        data_entrada: list.data_entrada,
                        data_ultima_alteracao: list.data_ultima_alteracao
                    }
                }))
                
            }
            return res.status(200).send(response)
            next()
        }
        else {
            const response = {
                msg: 'Tabela de listas vazia'
               
            }
            return res.status(500).send(response)
        }
    }).catch((error) => { 
        return res.status(500).send({msg : error.sqlMessage})
        next()
    })
}

export function busca_nomeLista(req, res, next){
    var { nome, cod_usuario } = req.query
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS')
    var cod_usuario_decoded =  decoded.cod_usuario
    const query =`SELECT * FROM LISTA_TAREFAS WHERE NOME_LISTA LIKE '%${nome}%' AND COD_USUARIO = ?;`
    execute(query ,[cod_usuario_decoded]).then((result) => {
        if (result.length > 0) {
            const response = {
                lista: result.map((list => {
                    return {
                        cod_usuario: list.cod_usuario,
                        cod_lista: list.cod_lista,
                        nome_lista: list.nome_lista,
                        categoria: list.categoria,
                        data_entrada: list.data_entrada,
                        data_ultima_alteracao: list.data_ultima_alteracao
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

export function item(req, res, next) {
    var id = +req.params.id
    if (id && id != NaN && req) {
        execute("SELECT * FROM LISTA_TAREFAS WHERE COD_LISTA = ?;", [id])
        .then((result) => {
            if (result.length > 0) {
                const response = {
                            cod_lista: result[0].cod_lista,
                            nome_lista: result[0].nome_lista,
                            categoria: result[0].categoria,
                            data_entrada: result[0].data_entrada,
                            data_ultima_alteracao: result[0].data_ultima_alteracao
                        }
                    
              
                return res.status(201).send(response)
                next()
            }
            else {
                const response = {
                    msg: `Lista não existe`,
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
                msg: error.sqlMessage,
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
    var cod_usuario = req.body.cod_usuario
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS');
    var cod_usuario_decoded = decoded.cod_usuario;
    var nomeLista = req.body.nome
    var categoriaLista = req.body.categoria
    if (cod_usuario_decoded && nomeLista && categoriaLista && req) {
        execute("INSERT INTO LISTA_TAREFAS(COD_USUARIO, NOME_LISTA, CATEGORIA) VALUES(?, ?, ?);", [cod_usuario_decoded, nomeLista.toUpperCase(), categoriaLista.toUpperCase()])
        .then((result) => {
            const response = {
                msg: `${nomeLista} cadastrada com sucesso`,
                cod_lista: result.insertId,
                request: {
                    tipo: 'POST',
                    descricao: 'Cadastro de Lista'
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
            msg: 'Necessario informar nome e categoria para cadastro de Lista',
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
    var nomeLista = req.body.nome
    var categoriaLista = req.body.categoria
    if (id && id != NaN && req) {
        if (nomeLista && categoriaLista) {
            execute("UPDATE LISTA_TAREFAS SET NOME_LISTA = ?,  CATEGORIA =  ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_LISTA = ?;", [nomeLista.toUpperCase(), categoriaLista.toUpperCase(), id])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Nome e categoria da Lista editados com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Listas'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Lista de ID(${id}) não existe`,
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

        else if (nomeLista) {
            execute("UPDATE LISTA_TAREFAS SET NOME_LISTA = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_LISTA = ?;", [nomeLista.toUpperCase(), id])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Nome da Lista editado com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Listas'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    return res.status(500).send({ msg: `Lista de ID(${id}) não existe` })
                    next()
                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

        }

        else if (categoriaLista) {
            execute("UPDATE LISTA_TAREFAS SET CATEGORIA = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_LISTA = ?;", [categoriaLista.toUpperCase(), id]).then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Categoria da Lista editada com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Listas'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Lista de ID(${id}) não existe`,
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
        execute("DELETE FROM LISTA_TAREFAS WHERE COD_LISTA = ?;", [id]).then((result) => {
            if (result.affectedRows > 0) {
                const response = {
                    msg: `Lista deletada com sucesso`,
                    request: {
                        tipo: 'DELETE',
                        descricao: 'Delete de Listas'
                    }
                }
                return res.status(201).send(response)
                next()
            }
            else {
                const response = {
                    msg: `Lista não existe`,
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
                msg: error.errno,
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
