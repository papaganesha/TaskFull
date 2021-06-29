import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function () {
  if (sessionStorage.cod_usuario != 0 && sessionStorage.cod_usuario && sessionStorage.cod_usuario != null) {
    index_perfil();
    document.getElementById("busca").innerHTML += sessionStorage.nome;   
    window.addEventListener("load", () => {
      sessionStorage.cod_tarefa = 0;
      timeInterval_global(index_perfil, 30000);
    })

  }
  else {
    window.location.assign("401");
  }
}




function index_perfil() {
  if (sessionStorage.cod_usuario) {
    var cod_usuario = sessionStorage.cod_usuario;
    $.ajax({
      url: `http://localhost:3000/v1/api/index/perfil`, // Url of backend (can be python, php, etc..)
      type: "post",
      data: { cod_usuario: cod_usuario }, // data type (can be get, post, put, delete)
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
        var data = response;
        var section = document.querySelector("#root");
        var span_msg = document.getElementById("span_msg");
        section.innerHTML = "";
        let template = `
                              <div class = "box">
                              <h2>Username: ${data.username}</h2>
                              <h2>Nome: ${data.nome} </h2>
                              <h2>Email: ${data.email} </h2>
                              <h2>Conta criada em: ${data.data_entrada}</h2>
                              <h2>Data de ultima alteração: ${data.data_entrada}</h2>                
                              </div>
                              `;
        section.innerHTML += template;
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




