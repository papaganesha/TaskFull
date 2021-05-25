import connection from '../database/config.js';

export function index(req, res) {
  console.log('ROTA DE GET TAREFAS REQUISITADA')
  let error = app.error;
  if (!error) {
    connection('SELECT * FROM tarefa', function (err, rows) {
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


export function item(req, res) {
    console.log('ROTA DE GET TAREFA POR ID REQUISITADA')

    let error = app.error;
    if (!error) {
      connection(`SELECT * FROM tarefa where cod_tarefa = ${req.params.id}`, function (err, rows) {
        if (err) {
            res.status(500).json({erro : "Database Error"})
            console.log('database error',err);
        } else {
          if (rows.length > 0 ){
          rows =  JSON.parse(JSON.stringify(rows));
          res.status(200).send(rows);
        }
        else {
          res.status(404).json({msg : `Tarefa de ID ${req.params.id} nao existe`});
        }
        }
      });
  
    }
    else {
      res.status(404).json({msg : `Tarefa de ID ${req.params.id} nao existe`});
    }
}



export function create(req, res) {
    console.log('ROTA DE POST TAREFAS REQUISITADA')
  let error = app.error;
  console.log(req.body)
  if (!error) {
    var sql = `INSERT INTO tarefa(COD_LISTA, NOME_TAREFA, DESCRICAO) values(?, ?, ?);`
    connection(sql, [req.body.cod_lista, req.body.nome, req.body.descricao], function (err, rows) {
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


export function update(req, res) {
    console.log('ROTA DE PUT TAREFAS REQUISITADA')
  let error = app.error;
  if (!error) {
    var sql = `INSERT INTO tarefa(NOME_TAREFA, DESCRICAO) values(?, ?);`
    connection(sql, [req.body.nome, req.body.descricao], function (err, rows) {
      if (err) {
        console.log('error', err);
        res.status(500).json({msg: `Tarefa de ID ${req.params.id} nao existe`});

      } else {
        res.status(202).send({msg: `Update de Tarefa de ID:${req.params.id} concluido`});
      }
    });

  }
  else {
    res.status(404).send({msg: `Tarefa de ID ${req.params.id} nao existe`});
  }
}


export function del(req, res) {
  console.log('ROTA DE DELETE TAREFAS REQUISITADA')
  let error = app.error;
  if (!error) {
    var sql = `DELETE FROM tarefa WHERE cod_tarefa = ?;`
    connection(sql, [req.params.id], function (err, rows) {
      if (err) {
        console.log('error', err);
        res.status(404).send({msg: `Tarefa de ID ${req.params.id} nao existe`});

      } else {
        res.status(200).send({msg: `Delete de Tarefa de ID:${req.params.id} concluido`});
      }
    });

  }
  else {
    res.status(404).send({msg: `Tarefa de ID ${req.params.id} nao existe`});
  }

}