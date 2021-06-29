import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function () {
  if (sessionStorage.cod_usuario != 0 && sessionStorage.cod_usuario && sessionStorage.cod_usuario != null) {
    document.getElementById("busca").innerHTML = sessionStorage.nome;   
    window.addEventListener("load", () => {
      document.getElementById("btn-editar").addEventListener("click", () => {
        confirmaEditar();
      })
    })
  }

  else {
    window.location.assign("401")
  }
}


function confirmaEditar() {
    var nomeTarefa = document.getElementById("nomeTarefa").value;
    var descricao = document.getElementById("descricao").value;
    var span_msg = document.getElementById("span_msg");
    var cod_tarefa = sessionStorage.cod_tarefa;
    if (nomeTarefa && descricao) {
      var formData = { nome: nomeTarefa, descricao: descricao };
    }
    else if (nomeTarefa) {
      var formData = { nome: nomeTarefa };

    }
    else if (descricao) {
      var formData = { descricao: descricao };

    }
    else {
      span_msg.innerHTML = dismissable_warning_Msg("Não pode submeter sem pelo menos um campo de alteração");
    }
    $.ajax({
      url: `http://localhost:3000/v1/api/update/task/${cod_tarefa}`, // Url of backend (can be python, php, etc..)
      type: "PUT", // data type (can be get, post, put, delete)
      data: formData, // data in json format
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
        span_msg.innerHTML += dismissable_sucess_Msg(response.msg);
        span_msg.hidden = false;
      },
      error: function (response) {
        span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
          span_msg.hidden = false;

      }
    })
  }



