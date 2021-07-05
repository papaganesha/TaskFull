import {
    execute
} from "../database/config.js";

import mailNewUser from '../services/mailer.js'


import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

function createJWT(obj, chave) {
    return jwt.sign({
        cod_usuario: obj
    }, chave, { expiresIn: '1h' })
}

export function auth(req, res, next) {
    let { username, password } = req.body;
    if (username && password) {
        execute("SELECT * FROM USUARIOS WHERE USERNAME = ? AND PASSWORD = ?;", [username, password])
            .then((result) => {
                if (result.length > 0) {
                    var cod_usuario = result[0].cod_usuario
                    var nome = result[0].NOME

                    //criando um jwt
                    var tokenJWT = createJWT(cod_usuario, 'RUTHLESS')
                    res.set('x-access-token', tokenJWT)
                    return res.status(200).send({
                        success: true,
                        msg: `${username} logado com sucesso`,
                        nome: nome,
                        cod_usuario: tokenJWT,
                    
                    })
                    next()
                }
                else {
                    return res.status(401).send({ msg: 'Username ou password incorretos' })
                    next()
                }
            }).catch((error) => {
                return res.status(500).send({
                    msg: error.sqlMessage
                })
                next()
            })
    }
    else {
        return res.status(401).send({
            msg: 'Necessario informar username e senha para logar'
        })
    }
}


export function register(req, res, next) {
    var username = req.body.username
    var password = req.body.password
    var nome = req.body.nome
    var email = req.body.email
    if (username && nome && email && password) {

        execute("INSERT INTO USUARIOS(USERNAME, NOME, EMAIL, PASSWORD) VALUES(?, ?, ?, ?);", [username.toUpperCase(), nome.toUpperCase(), email.toUpperCase(), password]).then((result) => {
            if (result.affectedRows > 0) {
                const response = {
                    msg: `${username} cadastrado com sucesso`
                }
                return res.status(201).send(response)
                mailNewUser(nome, email)
                next()
            } else {
                const response = {
                    msg: 'Usuario ja existe, verifique seus dados'
                }
                return res.status(400).send(response)
                next()
            }
        }).catch((error) => {
            const response = { msg: error }
            return res.status(500).send(response)
            next()
        })
    }
    else {
        const response = {
            msg: 'Necessario informar username, nome, email e password para cadastrar'
        }

        return res.status(400).send(response)
    }
}