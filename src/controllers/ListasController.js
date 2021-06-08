import {
    execute
  } from "../database/config.js";
  
  
  export function index(req, res, next){
         execute("SELECT * FROM LISTA_TAREFAS").then((result) => {
         if(result.length > 0) {
          const response = {
              quantidade: result.length,
              listas: result.map((list => {
                  return {
                      cod_usuario : list.cod_usuario,
                      cod_lista: list.cod_lista,
                      nome: list.nome_lista,
                      categoria: list.categoria,
                      request: {
                          tipo: 'GET',
                          descricao: 'Retorna as Listas cadastradas'
                      }
                  }
              }))
          }
          return res.status(200).send(response)
          next()
         }else{
           return res.status(500).send({ msg: 'Tabela de listas vazia'})
         }
      }).catch((error) => {
          const response = {
              msg : error.sqlMessage, 
              request: {
                  tipo: 'GET',
                  descricao: 'Erro durante operação de GET'
              }
          }
          return res.status(500).send(response)
          next()
      })
  }
  export function item(req, res, next){
      var id = +req.params.id
      if (id && id != NaN && req) {
          execute("SELECT * FROM LISTA_TAREFAS WHERE COD_LISTA = ?;", [id]).then((result) => {
          if(result.length > 0){    
              const response = {
                lista: result.map((list => {
                  return {
                      cod_usuario : list.cod_usuario,
                      cod_lista: list.cod_lista,
                      nome: list.nome_lista,
                      categoria: list.categoria,
                      request: {
                          tipo: 'GET',
                          descricao: 'Retorna a Lista de ID requerido'
                      }
                      }
                  }))
              }
                  return res.status(201).send(response)
                  next()
                  }
                  else{
                      const response = {
                          msg : `Lista de ID(${id}) não existe`, 
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
                  msg : error.sqlMessage, 
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
      var nomeLista = req.body.nome
      var categoriaLista = req.body.categoria
      if (req && nomeLista && categoriaLista) {
              execute("INSERT INTO LISTA_TAREFAS(COD_USUARIO, NOME_LISTA, CATEGORIA) VALUES(91, ?, ?);", [nomeLista.toUpperCase(), categoriaLista.toUpperCase()]).then((result) => {
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
              msg: 'Necessario informar nome e categoria para cadastro de Lista', 
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
      var nomeLista = req.body.nome
      var categoriaLista = req.body.categoria
      if (id && id != NaN && req) {
          if (nomeLista && categoriaLista) {
                  execute("UPDATE LISTA_TAREFAS SET NOME_LISTA = ?,  CATEGORIA =  ? WHERE COD_LISTA = ?;", [nomeLista.toUpperCase(), categoriaLista.toUpperCase() , id]).then((result) => {
                  if(result.affectedRows > 0){    
                      const response = {
                          msg: `Nome e categoria da Lista de ID(${id}) editados com sucesso`,
                          request: {
                              tipo: 'PUT',
                              descricao: 'Edição de Listas'
                          }
                      }
                      return res.status(201).send(response)
                      next()
                      }
                      else{
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
  
          else if (nomeLista) {
                  execute("UPDATE LISTA_TAREFAS SET NOME_LISTA = ? WHERE COD_LISTA = ?;", [nomeLista.toUpperCase(), id]).then((result) => {
                  if(result.affectedRows > 0){    
                  const response = {
                      msg: `Nome da Lista de ID(${id}) editado com sucesso`,
                      request: {
                          tipo: 'PUT',
                          descricao: 'Edição de Listas'
                      }
                  }
                  return res.status(201).send(response)
                  next()
                  }
                  else{
                      return res.status(500).send({ msg: `Lista de ID(${id}) não existe` })
                      next()
                  }
                  
              }).catch((error) => {
                  return res.status(500).send({ error: error })
                  next()
              })
  
          }
  
          else {
                  execute("UPDATE LISTA_TAREFAS SET CATEGORIA = ? WHERE COD_LISTA = ?;", [categoriaLista.toUpperCase(), id]).then((result) => {
                  if(result.affectedRows > 0){    
                      const response = {
                          msg: `Categoria da Lista de ID(${id}) editada com sucesso`,
                          request: {
                              tipo: 'PUT',
                              descricao: 'Edição de Listas'
                          }
                      }
                      return res.status(201).send(response)
                      next()
                      }
                      else{
                          const response = {
                              msg : `Lista de ID(${id}) não existe`, 
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
              execute("DELETE FROM LISTA_TAREFAS WHERE COD_LISTA = ?;", [id]).then((result) => {
              const response = {
                  msg: `Lista de ${id} deletada com sucesso`,
                  request: {
                      tipo: 'POST',
                      descricao: 'Delete de Listas'
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
  