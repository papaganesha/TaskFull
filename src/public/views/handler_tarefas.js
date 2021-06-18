window.onload =  index_tarefas();
window.addEventListener("load", () => {

  sessionStorage.cod_tarefa = 0;

  timeInterval_20secs(index_tarefas);


  document.getElementById("deslogar").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.assign("/");
  })
  
  redirectAdicionarTarefa();
  botoes_editaTarefas();
  botoesExcluir()
  //switchStatus();
})

var timeInterval_20secs = (nomeFuncao) => {
  window.setInterval(nomeFuncao, 20000);
  window.setInterval(() => {
    console.log("20secs, REFRESH");
  }, 20000);
}

var timeInterval_3secs = (nomeFuncao) => {
  window.setInterval(nomeFuncao, 3000);
  window.setInterval(() => {
    console.log("3secs, REFRESH");
  }, 3000);
}

var timeOut_global = (nomeFuncao, ms) => {
  window.setTimeout(nomeFuncao, ms);
  window.setTimeout(() => {
    console.log("REFRESH");
  }, ms);
}



function redirectAdicionarTarefa(){
        document.getElementById("btnAdicionarTarefa").addEventListener("click", ()=>{
            location.assign("adicionarTarefa");
        })
}


function botoes_editaTarefas() {
  let elementsArray = document.querySelectorAll("#btnEditarTarefa");
  elementsArray.forEach(function (elem) {
      elem.addEventListener("click", () => {
          var codTarefa = elem.value;
          console.log(codTarefa);
          //sessionStorage.setItem('cod_tarefa', codTarefa);
          sessionStorage.cod_tarefa = codTarefa;

          window.location.assign("editarTarefa");
      })
  })
}




function botoesExcluir() {
  let elementsArray = document.querySelectorAll("#btnExcluirTarefa");
  elementsArray.forEach(function (elem) {
      elem.addEventListener("click", () => {
          var codTarefa = elem.value;
          excluirTarefa(codTarefa);
          timeOut_global(index_tarefas, 500);
      })
  })

}

function excluirTarefa(codTarefa) {
  $.ajax({
      url: "http://localhost:3000/v1/api/delete/task/" + codTarefa, // Url of backend (can be python, php, etc..)
      type: "DELETE", // data type (can be get, post, put, delete)
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
          span_msg.innerHTML = dismissable_sucess_Msg(response.msg);
          span_msg.hidden = false;

      },
      error: function (response) {
          var data = response.responseJSON.msg;
          span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
          span_msg.hidden = false;
          return response;

      }
  })
}








function index_tarefas() {
    if (sessionStorage.cod_usuario) {
      var codLista = sessionStorage.cod_lista;
      $.ajax({
        url: `http://localhost:3000/v1/api/list/tasks/${codLista}`, // Url of backend (can be python, php, etc..)
        type: "GET", // data type (can be get, post, put, delete)
        async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response) {
          var data = response;
          var section = document.querySelector("#root");
          var span_msg = document.getElementById("span_msg");
          section.innerHTML = "";
          for (let i = 0; i < data.tarefa.length; i++) {
            if (data.tarefa[i].statusTarefa === 0) {
              statusTarefa = "Em andamento"
            }
            else {
              statusTarefa = "Concluida"
            }
            let template = `
                              <dl class = "box">
                              <span hidden  id="cod_tarefa" value="${data.tarefa[i].cod_tarefa}"></span>
                              <br> 
                                  <dt>
                                      <a href="#"> ${data.tarefa[i].nome_tarefa} </a>
                                  </dt>
                                  <br>
                                  <dd>
                                       Descrição: ${data.tarefa[i].descricao}
                                  </dd>
                                  <dd>
                                       Status: ${statusTarefa}
                                  </dd>
                                  <dd>
                                       Criada em: ${data.tarefa[i].data_entrada}
                                  </dd>
                                  <br>
                  
                                      <input type="hidden" name="cod_tarefa" value="${data.tarefa[i].cod_tarefa}" />
                                      <button value="${data.tarefa[i].cod_tarefa}" class="btn btn-primary" id="btnEditarTarefa">Editar</button>
                                      <button value="${data.tarefa[i].cod_tarefa}" class="btn btn-primary" id="btnExcluirTarefa">Excluir</button>
                                     
  
                              </dl>
                              
                              `;
            section.innerHTML += template;
          }
        },
        error: function (response) {
          span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
          span_msg.hidden = false;
        }
      })
    }
    else {
      window.location.assign("401");
    }
  }







  function dismissable_sucess_Msg(msg) {
    return `
  <div class="alert alert-success  alert-dismissible fade show" role="alert">
  <strong>Tudo Certo!</strong>${" "}${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  `
  }

  function dismissable_warning_Msg(msg) {
    return `
<div class="alert alert-warning alert-dismissible fade show" role="alert">
<strong>Erro!</strong>${" "}${msg}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`
  }