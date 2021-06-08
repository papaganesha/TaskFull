import {
    execute
  } from "../database/config.js";
  
  
  import bcrypt from 'bcryptjs'
  import jwt from 'jsonwebtoken';
  
  
  export function auth(req, res, next){   
      var username = req.body.username
      var password = req.body.password
      if (username && password) {
          const salt = bcrypt.genSaltSync(10)
          var password_hashed = bcrypt.compareSync(password, salt)
              execute("SELECT * FROM USUARIOS WHERE USERNAME = ? AND PASSWORD = ?;", [username, password_hashed]).then((result) => {
              if(result.length > 0){
                  /*export let token = jwt.sign({
                      cod_usuario : result[0].cod_usuario
                    }, 'RUTHLESS', { expiresIn: '1h' })
                    var decoded = jwt.verify(token, 'RUTHLESS');
                    console.log(decoded.cod_usuario) */
                 
                  const response = {
                      msg : `${username} logado com sucesso`,
                              request: {
                                  tipo: 'POST',
                                  descricao: 'Login de Usuarios'
                              }
                          }
  
                  return res.status(201).send(response)
                  next()
              }else{
                  const response = {
                      msg : 'Erro na autentição, verifique seus dados', 
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
      else {
          const response = {
              msg: 'Necessario informar username e senha para logar', 
              request: {
                  tipo: 'POST',
                  descricao: 'Erro durante operação de POST'
              }
          }
          return res.status(500).send(response)
      }
  }
  
  
  export function register(req, res, next){
      var username = req.body.username
      var password = req.body.password
      var nome = req.body.nome
      var email = req.body.email
      if (username && nome && email && password) {
          const salt = bcrypt.genSaltSync(10)
          var password_hashed = bcrypt.hashSync(password, salt)
          execute("INSERT INTO USUARIOS(USERNAME, NOME, EMAIL, PASSWORD) VALUES(?, ?, ?, ?);", [username.toUpperCase(), nome.toUpperCase(), email.toUpperCase(), password_hashed]).then((result) => {
              if(result.affectedRows > 0){
                  const response = {
                              msg : `${username} cadastrado com sucesso`, 
                              request: {
                                  tipo: 'POST',
                                  descricao: 'Cadastro de Usuarios'
                              }
                  }
                  return res.status(201).send(response)
                  next()
              }else{
                  const response = {
                      msg : 'Usuario ja existe, verifique seus dados', 
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
                  msg : error.sqlMessage, 
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
              msg: 'Necessario informar username, nome, email e password para cadastrar', 
              request: {
                  tipo: 'POST',
                  descricao: 'Erro durante operação de POST'
              }
          }
          return res.status(500).send(response)
      }
  }