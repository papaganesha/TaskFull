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
        else { res.status(404).send({ msg: 'Tabela de listas vazia' })}

    }).catch((error) => { res.status(500).send({msg : error.sqlMessage}) })
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
            res.status(200).send(response)
            next()
        }
        else {res.status(404).send({ msg: 'Tabela de listas vazia'}) }

    }).catch((error) => { res.status(500).send({msg : error.sqlMessage})})
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
            res.status(200).send(response)
            next()
        }
        else { res.status(404).send({ msg: `Nenhuma Lista para pesquisa: ${nomeLista}` })}
    })
    .catch((error) => { res.status(404).send({msg : error.sqlMessage}) })
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
                    
                res.status(201).send(response)
                next()
            }
            else { res.status(404).send({ msg: `Lista não existe`})}

        }).catch((error) => { res.status(500).send({msg: error.sqlMessage}) })
    } 
    else { res.status(500).send({ msg: 'ID nao inserido ou não numerico'})}
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
            res.status(201).send({
                msg: `${nomeLista} cadastrada com sucesso`,
                cod_lista: result.insertId
            })
            next()

        }).catch((error) => {res.status(500).send({ msg: error.sqlMessage }) })
    }

    else { res.status(500).send({ msg: 'Necessario informar nome e categoria para cadastro de Lista'}) }
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
                    res.status(200).send({ msg: `Nome e categoria da Lista editados com sucesso`})
                    next()
                }
                else { res.status(404).send({ msg: `Lista de ID(${id}) não existe`}) }

            }).catch((error) => { res.status(500).send( {msg: error.sqlMessage }) })
        }

        else if (nomeLista) {
            execute("UPDATE LISTA_TAREFAS SET NOME_LISTA = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_LISTA = ?;", [nomeLista.toUpperCase(), id])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Nome da Lista editado com sucesso`})
                    next()
                }
                else { res.status(404).send({ msg: `Lista de ID(${id}) não existe` })}

            })
            .catch((error) => { res.status(500).send({ error: error.sqlMessage }) })
        }

        else if (categoriaLista) {
            execute("UPDATE LISTA_TAREFAS SET CATEGORIA = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE COD_LISTA = ?;", [categoriaLista.toUpperCase(), id]).then((result) => {
                if (result.affectedRows > 0) {
                    res.status(200).send({ msg: `Categoria da Lista editada com sucesso`})
                    next()
                }
                else { res.status(404).send({msg: `Lista de ID(${id}) não existe`})}

            }).catch((error) => { res.status(500).send({msg: error.sqlMessage }) })
        }
        else { res.status(500).send({ msg: `É necessario informar os campos de alteração` }) }
    }

    else { res.status(500).send({ msg: 'ID não inserido ou não numerico'}) }
}

export function del(req, res, next) {
    var id = +req.params.id
    if (id && id != NaN && req) {
        execute("DELETE FROM LISTA_TAREFAS WHERE COD_LISTA = ?;", [id]).then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).send({msg: `Lista deletada com sucesso`})
                next()
            }
            else { res.status(404).send({ msg: `Lista não existe`}) }
        })
        .catch((error) => { res.status(500).send({ msg: error.errno }) })
    } 
    else { res.status(500).send({ msg: 'ID não inserido ou não numerico'}) }

}
