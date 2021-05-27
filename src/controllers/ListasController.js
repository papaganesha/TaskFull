import connection from "../database/config.js";

export function index(req, res) {
  console.log("ROTA DE GET LISTAS REQUISITADA");

  let sql = "SELECT * FROM lista_tarefas";

  connection.query(sql, function (err, rows) {
    if (err) {
      res.status(500).json({ erro: "Database Error" });
    } else {
      rows = JSON.parse(JSON.stringify(rows));
      res.status(200).send(rows);
    }
  });
}

export function item(req, res) {
  let sql = `SELECT * FROM lista_tarefas WHERE cod_lista = ?`;
  connection.query(sql, [req.params.id], function (err, rows) {
    if (err) {
      res.status(500).json({ erro: "Database Error" });
      console.log("database error", err);
    } else {
      if (rows.length > 0) {
        rows = JSON.parse(JSON.stringify(rows));
        res.status(200).send(rows);
      } else {
        res
          .status(404)
          .json({ msg: `Lista de ID ${req.params.id} nao existe` });
      }
    }
  });
}

export function create(req, res) {
  let sql = `INSERT INTO LISTA_TAREFAS(COD_USUARIO, NOME_LISTA, CATEGORIA) values(?, ?, ?)`;
  connection.query(
    sql,
    [req.body.cod_usuario, req.body.nome, req.body.categoria],
    function (err, rows) {
      if (err) {
        res.status(500).json({ erro: "Database Error" });
        console.log("database error", err);
      } else {
        rows = JSON.parse(JSON.stringify(rows));
        res.status(201).json({ msg: `Lista ${req.body.nome} adicionada` });
      }
    }
  );
}

export function update(req, res) {
  console.log("ROTA DE PUT LISTAS REQUISITADA");
  let sql = `UPDATE LISTA_TAREFAS SET NOME_LISTA = ?, CATEGORIA = ?, DATA_ULTIMA_ALTERACAO = NOW() WHERE cod_lista = ?`;
  connection.query(
    sql,
    [req.body.nome, req.body.categoria, req.params.id],
    function (err, rows) {
      if (err) {
        console.log("error", err);
        res
          .status(500)
          .json({ msg: `Lista de ID ${req.params.id} nao existe` });
      } else {
        res
          .status(202)
          .send({ msg: `Update de Lista de ID:${req.params.id} concluido` });
      }
    }
  );
}

export function del(req, res) {
  console.log("ROTA DE DELETE LISTAS REQUISITADA");
  let sql = `DELETE FROM LISTA_TAREFAS WHERE COD_LISTA = ?`;
  connection.query(sql, [req.params.id], function (err, rows) {
    if (err) {
      console.log("error", err);
      res.status(404).send({ msg: `Lista de ID ${req.params.id} nao existe` });
    } else {
      res
        .status(200)
        .send({ msg: `Delete de Lista de ID:${req.params.id} concluido` });
    }
  });
}
