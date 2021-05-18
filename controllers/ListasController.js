var express = require('express');
var dbConn = require('../database/config');
var app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



exports.listar = (req, res) => {
  console.log('ROTA DE GET LISTAS REQUISITADA')
  let error = app.error;
  if (!error) {
    dbConn.query('SELECT * FROM lista_tarefas', function (err, rows) {
      if (err) {
          res.status(500).json({erro : "Database Error"})
        console.log('database error',err);
      } else {
        rows =  JSON.parse(JSON.stringify(rows));
        res.status(200).send(rows);
        console.log(rows);
      }
    });

  }
  else {
    res.status(404).send("Bad link");
  }
}


exports.listar_porID = (req, res) => {
    console.log('ROTA DE GET LISTA POR ID REQUISITADA')

    let error = app.error;
    if (!error) {
      var sql = `SELECT * FROM lista_tarefas WHERE cod_lista = ?;`
      dbConn.query(sql, [req.params.id], function (err, rows) {
        if (err) {
            res.status(500).json({erro : "Database Error"})
            console.log('database error',err);
        } else {
          if (rows.length > 0 ){
          rows =  JSON.parse(JSON.stringify(rows));
          res.status(200).send(rows);
        }
        else {
          res.status(404).json({msg : `Lista de ID ${req.params.id} nao existe`});
        }
        }
      });
  
    }
    else {
      res.status(404).json({msg : `Tarefa de ID ${req.params.id} nao existe`});
    }
}



exports.adicionar_lista = (req, res) => {
    console.log('ROTA DE POST LISTAS REQUISITADA')
  let error = app.error;
  console.log(req.body)
  if (!error) {
    var sql = `INSERT INTO LISTA_TAREFAS(NOME_LISTA, CATEGORIA) values(?, ?);`
    dbConn.query(sql, [req.body.nome, req.body.categoria], function (err, rows) {
      if (err) {
        res.status(500).json({erro : "Database Error"})
        console.log('database error',err);
      } else {
        rows =  JSON.parse(JSON.stringify(rows));
        res.status(201).json({ msg: `Lista ${req.body.nome} adicionada`});
      }
    });

  }
  else {
    res.status(404).json({ msg: "Algo deu errado"});
  }

}


exports.alterar_lista = (req, res) => {
    console.log('ROTA DE PUT LISTAS REQUISITADA')
  let error = app.error;
  if (!error) {
    var sql = `UPDATE LISTA SET NOME = ?, CATEGORIA = ? WHERE cod_lista = ?;`
    dbConn.query(sql, [req.body.nome, req.body.categoria, req.params.id], function (err, rows) {
      if (err) {
        console.log('error', err);
        res.status(500).json({msg: `Lista de ID ${req.params.id} nao existe`});

      } else {
        res.status(202).send({msg: `Update de Lista de ID:${req.params.id} concluido`});
      }
    });

  }
  else {
    res.status(404).send({msg: `Tarefa de ID ${req.params.id} nao existe`});
  }
}


exports.deletar_lista = (req, res) => {
  console.log('ROTA DE DELETE LISTAS REQUISITADA')
  let error = app.error;
  if (!error) {
    var sql = `DELETE FROM tarefa WHERE where cod_tarefa = ?;`
    dbConn.query(sql, [req.params.id], function (err, rows) {
      if (err) {
        console.log('error', err);
        res.status(404).send({msg: `Lista de ID ${req.params.id} nao existe`});

      } else {
        res.status(200).send({msg: `Delete de Lista de ID:${req.params.id} concluido`});
      }
    });

  }
  else {
    res.status(404).send({msg: `Lista de ID ${req.params.id} nao existe`});
  }

}