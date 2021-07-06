import { deslogar, timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg } from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    index_tarefas();
      localStorage.cod_tarefa = 0;
      setInterval(function () {
        document.querySelectorAll('.btnsTarefas').forEach(item => {
            item.addEventListener('click', e => {
            
                if (e.target !== e.currentTarget) {
                    if(e.target.id == "EditarTarefa"){
                        var codTarefa = e.target.value;
                        localStorage.cod_tarefa = codTarefa;
                        location.assign('editarTarefa');
                    }
                    else if(e.target.id == "DeletarTarefa"){
                        var codLista = e.target.value;
                        excluirTarefa(codLista);
                        setTimeout(index_tarefas, 1000);
                    }

                }
                e.stopPropagation();
            })
          })
    },1000);

    $('#buscarTarefas').on("submit", (event) => {
      event.preventDefault();
      var valor = document.getElementById("buscaTarefa").value;
      if(valor != ""){
        buscarTarefas(valor);
        document.getElementById("buscaTarefa").value = "";
      }
      else{
        index_tarefas();
      }
      
    })  

    deslogar();
    timeInterval_global(index_tarefas, 30000);
      
  }
  else {
    window.location.assign("/")
  }

}



function excluirTarefa(codTarefa) {
  var span_msg = document.getElementById("span_msg");
  $.ajax({
    url: "http://localhost:3000/v1/api/delete/task/" + codTarefa, // Url of backend (can be python, php, etc..)
    type: "DELETE", // data type (can be get, post, put, delete)
    async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    success: function (response) {
      span_msg.innerHTML += dismissable_sucess_Msg(response.msg);
      span_msg.hidden = false;

    },
    error: function (response) {
      var data = response.responseJSON.msg;
      span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
      span_msg.hidden = false;
      return response;

    }
  })
}




function index_tarefas() {
    var codLista = localStorage.cod_lista;
    $.ajax({
      url: `http://localhost:3000/v1/api/list/tasks/${codLista}`, // Url of backend (can be python, php, etc..)
      type: "GET", // data type (can be get, post, put, delete)
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
        var data = response;
        var statusTarefa = "";
        var span_msg = document.getElementById("span_msg");
        $('table').find('td').remove();
        for (let i = 0; i < data.tarefa.length; i++) {
          if (data.tarefa[i].statusTarefa === 0) {
            statusTarefa = "Em andamento";
          }
          else {
            statusTarefa = "Concluida";
          }
          
          $('table').find('tbody')
            .append(`<tr>
                        <td >
                            <div class="d-flex px-2 py-1">
                                
                              <div class="d-flex flex-column justify-content-center mx-2">
                                 <h6 class="mb-0 text-sm ">${data.tarefa[i].nome_tarefa} </h6>
                              </div>
                            </div>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0">${data.tarefa[i].descricao}</p>
                         </td>
                         <td>
                         <p class="text-xs font-weight-bold mb-0">${statusTarefa}</p>
                      </td>
                         <td class="align-middle">
                            <div class="btnsTarefas">
                              <button id="EditarTarefa" value="${data.tarefa[i].cod_tarefa}" class="btn btn-primary"> Editar</button>
                              <button id="DeletarTarefa" value="${data.tarefa[i].cod_tarefa}" class="btn btn-primary"> Excluir</button>
                              <button id="MudarStatus" value="${data.tarefa[i].statusTarefa}" class="btn btn-primary"> Concluir</button>

                              </div>
                          </td>
                      </tr>
             `);
        }
      },
      error: function (response) {
        span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
        span_msg.hidden = false;
      }
    })
  
 
}


function buscarTarefas(nome) {
  var cod_lista = localStorage.cod_lista;
  //var formData = { cod_usuario: cod_usuario, nome: valor };
  $.ajax({
    url: `http://localhost:3000/v1/api/task/?cod_lista=${cod_lista}&nome=${nome}`, // Url of backend (can be python, php, etc..)
    type: "GET", // data type (can be get, post, put, delete)
  
    async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    success: function (response) {
        var data = response;
        var statusTarefa = "";
        var span_msg = document.getElementById("span_msg");
        for (let i = 0; i < data.length; i++) {
          if (data.tarefa[i].statusTarefa === 0) {
            statusTarefa = "Em andamento";
          }
          else {
            statusTarefa = "Concluida";
          }
          $('table').find('td').remove();
          $('table').find('tbody')
            .append(`<tr>
                        <td >
                            <div class="d-flex px-2 py-1">
                                
                              <div class="d-flex flex-column justify-content-center mx-2">
                                 <h6 class="mb-0 text-sm ">${data.tarefa[i].nome_tarefa} </h6>
                              </div>
                            </div>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0">${data.tarefa[i].descricao}</p>
                         </td>
                         <td>
                         <p class="text-xs font-weight-bold mb-0">${statusTarefa}</p>
                      </td>
                         <td class="align-middle">
                            <div class="btnsTarefas">
                              <button id="EditarTarefa" value="${data.tarefa[i].cod_tarefa}" class="btn btn-primary"> Editar</button>
                              <button id="DeletarTarefa" value="${data.tarefa[i].cod_tarefa}" class="btn btn-primary"> Excluir</button>
                              <button id="MudarStatus" value="${data.tarefa[i].statusTarefa}" class="btn btn-primary"> Concluir</button>

                              </div>
                          </td>
                      </tr>
             `);
      }
    },
    error: function (response) {
      if(response.status === 404){
          $('table').find('td').remove();
          span_msg.innerHTML = dismissable_warning_Msg(`Nenhuma Tarefa ${nome} disponivel.`);
          span_msg.hidden = false;
      }
      
    }
  })


}