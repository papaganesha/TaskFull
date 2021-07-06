import {
    execute
} from "../database/config.js";

import jwt from 'jsonwebtoken';


export function item(req, res, next) {
    var { cod_usuario } = req.body
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS');
    var cod_usuario_decoded = decoded.cod_usuario;
    if (cod_usuario) {
        var query = "SELECT * FROM USUARIOS WHERE COD_USUARIO = ?;"
        execute(query, [cod_usuario_decoded])
            .then((result) => {
                if (result.length > 0) {
                    var nome = result[0].NOME
                    var username = result[0].username
                    var email = result[0].email
                    return res.status(200).send({nome : nome, username : username, email : email})
                    next()
                }
                else {
                    return res.status(404).send({ msg: `Usuario não existe` })
                    next()
                }
            }).catch((error) => {
                res.status(500).send({ msg: error.sqlMessage })
                next()
            })
    } else {
        res.status(500).send({
            msg: error.sqlMessage
        })
    }

}

export function update(req, res, next) {
    var { cod_usuario, nome, email, password } = req.body
    var decoded = jwt.verify(cod_usuario, 'RUTHLESS');
    var cod_usuario_decoded = decoded.cod_usuario;
    if (nome && email && password) {
        execute("UPDATE USUARIOS SET nome = ?, email = ?, password ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome, email, password, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({
                        msg: `Informações de usuário editadas com sucesso`
                    })
                    next()
                }
                else {
                    res.status(500).send({ msg: `Erro durante operação` })
                    next()
                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

    }
    else if (nome && email) {
        execute("UPDATE USUARIOS SET nome = ?, email = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome, email, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Informações de usuário editadas com sucesso` })
                    next()
                }
                else {
                    return res.status(500).send({ msg: `Erro durante operação` })
                    next()
                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

    }
    else if (nome && password) {
        execute("UPDATE USUARIOS SET nome = ?, password = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome, passwor, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Informações de usuário editadas com sucesso` })
                    next()
                }
                else {
                    return res.status(500).send({ msg: `Erro durante operação` })
                    next()
                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

    }

    else if (email && password) {
        execute("UPDATE USUARIOS SET email = ?, password = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [email, password, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Informações de usuário editadas com sucesso` })
                    next()
                }
                else {
                    return res.status(500).send({ msg: `Erro durante operação` })
                    next()
                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })
                next()
            })

    }

    else if (nome) {
        execute("UPDATE USUARIOS SET nome = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [nome, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Informações de usuário editadas com sucesso` })
                    next()
                }
                else {
                    return res.status(500).send({ msg: `Erro durante operação` })

                }

            })
            .catch((error) => {
                return res.status(500).send({ error: error })

            })

    }
    else if (password) {
        execute("UPDATE USUARIOS SET password = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [password, cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Informações de usuário editadas com sucesso` })
                    next()
                }
                else {
                    res.status(500).send({
                        msg: `Erro durante operação`
                    })
                    next()
                }

            }).catch((error) => {
                return res.status(500).send({
                    msg: error.sqlMessage
                })

            })
    }
    else if (email) {
        execute("UPDATE USUARIOS SET email = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_usuario = ?;", [email.toUpperCase(), cod_usuario_decoded])
            .then((result) => {
                if (result.affectedRows > 0) {
                    res.status(201).send({ msg: `Informações de usuário editadas com sucesso` })
                    next()
                }
                else {
                    res.status(500).send({ msg: `Erro durante operação` })

                }

            }).catch((error) => {
                res.status(500).send({
                    msg: error.sqlMessage
                })

            })
    }


}

