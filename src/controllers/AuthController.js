
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

function createPass(password){
    return bcrypt.hashSync(password, 8)
}

export function auth(req, res, next) {
    let { username, password } = req.body;
    //password = createPass(password)
    if (username && password) {
        execute("SELECT * FROM USUARIOS WHERE USERNAME = ? AND PASSWORD = ?;", [username, password])
            .then((result) => {
                if (result.length > 0) {
                    var cod_usuario = result[0].cod_usuario
                    var nome = result[0].NOME
                    var username = result[0].username
                    var email = result[0].email

                    let options = {
                        path:"/",
                        sameSite:true,
                        maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
                        httpOnly: true, // The cookie only accessible by the web server
                    }


                    //criando um jwt
                    var tokenJWT = createJWT(cod_usuario, 'RUTHLESS')
                    res.cookie('x-access-token',tokenJWT, options) 
                    res.status(202).send({
                        success: true,
                        msg: `${username} logado com sucesso`,
                        username: username,
                        nome: nome, 
                        cod_usuario: tokenJWT
                    })
                    next()
                    
                }
                else {
                    return res.status(401).send({ msg: 'Username ou password incorretos' })
                
                }
            }).catch((error) => {
                return res.status(500).send({
                    msg: error.sqlMessage
                })
               
            })
    }
    else {
        return res.status(401).send({
            msg: 'Necessario informar username e senha para logar'
        })
    }
}


export function register(req, res, next) {
    var {username,  nome, email, password} = req.body
    //password = createPass(password)
    if (username && nome && email && password) {

        execute("INSERT INTO USUARIOS(USERNAME, NOME, EMAIL, PASSWORD) VALUES(?, ?, ?, ?);", [username.toUpperCase(), nome.toUpperCase(), email.toUpperCase(), password]).then((result) => {
            if (result.affectedRows > 0) {
                res.status(201).send({ msg: `${username} cadastrado com sucesso`})
                // USANDO NODEMAILER
                mailNewUser(nome, email)
                next()
            } else {
                res.status(500).send({msg: 'Usuario ja existe, verifique seus dados'})
            }
        }).catch((error) => {
            res.status(500).send({ msg: error.sqlMessage })
        })
    }
    else {
        return res.status(400).send({msg: 'Necessario informar username, nome, email e password para cadastrar'})
    }
}