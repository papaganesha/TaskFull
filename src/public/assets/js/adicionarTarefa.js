import { deslogar, timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg } from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario && localStorage.cod_usuario != null) {
    timeOut_global(formAddTarefa,1500);
    timeOut_global(deslogar,1500);
  }
  else {
    window.location.assign("/")
  }
}


function formAddTarefa(){
  $('form').on("submit", (event) => {
    event.preventDefault();
    var nomeTarefa = document.getElementById("nomeTarefa");
    var descricao = document.getElementById("descricao");
    var span_msg = document.getElementById("span_msg");
    if (nomeTarefa && descricao) {
      adicionarTarefa(nomeTarefa.value, descricao.value);
    }
    else {
      span_msg.innerHTML += dismissable_warning_Msg("Insira os dados corretamente");
      span_msg.hidden = false;
    }
  })
}

function adicionarTarefa(nomeTarefa, descricao) {
  var cod_lista = localStorage.cod_lista;
  var formData = { cod_lista: cod_lista, nome: nomeTarefa, descricao: descricao };
  $.ajax({
    url: "http://localhost:3000/v1/api/create/task",   // Url of backend (can be python, php, etc..)
    type: "POST", // data type (can be get, post, put, delete)
    data: formData, // data in json format
    async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    success: function (response) {
      span_msg.innerHTML += dismissable_sucess_Msg(response.msg);
      span_msg.hidden = false;

    },
    error: function (response) {
      if (response.responseJSON.msg.errno === 1062) {
        span_msg.innerHTML += dismissable_warning_Msg("Tarefa já existente");
        span_msg.hidden = false;

      } else {
        span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
        span_msg.hidden = false;

      }
    }
  })
}








