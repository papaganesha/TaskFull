import {
    execute
} from "../database/config.js";

import jwt from 'jsonwebtoken';


export function item(req, res, next) {
    var cod_usuario = req.body.cod_usuario   
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS');
    var cod_usuario_decoded = decoded.cod_usuario;
    if (cod_usuario && cod_usuario != NaN && req) {
        execute("SELECT * FROM USUARIOS WHERE COD_USUARIO = ?;", [cod_usuario_decoded])
        .then((result) => {
            if (result.length > 0) {
                const response = {
                            username: result[0].username,
                            nome: result[0].NOME,
                            email: result[0].email,
                            //password: result[0].email,
                            data_entrada: result[0].data_entrada,
                            data_ultima_alteracao: result[0].data_ultima_alteracao
                        }
                    
              
                return res.status(201).send(response)
                next()
            }
            else {
                const response = {
                    msg: `Usuario não existe`,
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

export function update(req, res, next) {
    var cod_usuario = req.body.cod_usuario   
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS');
    var cod_usuario_decoded = decoded.cod_usuario;
    var nome = req.body.nome
    var email = req.body.email
    var password = req.body.password
    if (cod_usuario_decoded && cod_usuario_decoded != NaN && req) {
        if (nome && email && password) {
            execute("UPDATE USUARIOS SET nome = ?,  email =  ?,  password = ?,  DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome.toUpperCase(), email.toUpperCase(), password, cod_usuario_decoded])
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
                        descricao: 'Erro durante operação de POST'
                    }
                }
                return res.status(500).send(response)
                next()
            })
        }

        else if (nome) {
            execute("UPDATE USUARIOS SET nome = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome.toUpperCase(), cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Nome da usuario editado com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Perfil'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Erro durante operação`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Erro durante operação de PUT'
                        }
                    }
                    return res.status(500).send(response)
                    next()
                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

        }

        else if (email) {
            execute("UPDATE USUARIOS SET email = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [email.toUpperCase(), cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Email do usuario editado com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Perfil'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Erro durante operação`,
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

        else if (password) {
            execute("UPDATE USUARIOS SET password = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [password, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Password do usuario editado com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Perfil'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Erro durante operação`,
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

        else if (nome && email) {
            execute("UPDATE USUARIOS SET nome = ?, email =?,  DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome.toUpperCase(), email.toUpperCase(), cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Nome e Email do usuario editados com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Perfil'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Erro durante operação`,
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

        else if (nome && senha) {
            execute("UPDATE USUARIOS SET nome = ?, password =?,  DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome.toUpperCase(), senha, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Nome e Senha do usuario editados com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Perfil'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Erro durante operação`,
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

        else if (email && senha) {
            execute("UPDATE USUARIOS SET email = ?, senha =?,  DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [email.toUpperCase(), senha, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    const response = {
                        msg: `Email e senha do usuario editados com sucesso`,
                        request: {
                            tipo: 'PUT',
                            descricao: 'Edição de Perfil'
                        }
                    }
                    return res.status(201).send(response)
                    next()
                }
                else {
                    const response = {
                        msg: `Erro durante operação`,
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