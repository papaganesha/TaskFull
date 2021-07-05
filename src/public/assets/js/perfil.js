import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    index_perfil();
    //document.getElementById("print_nome").innerHTML += localStorage.nome;   
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
  if (localStorage.cod_usuario) {
    var cod_usuario = localStorage.cod_usuario;
    $.ajax({
      url: `http://localhost:3000/v1/api/index/perfil`, // Url of backend (can be python, php, etc..)
      type: "post",
      data: { cod_usuario: cod_usuario }, // data type (can be get, post, put, delete)
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
        var data = response;
        var username = document.getElementById("print_username");
        var userText = document.getElementById("print_userText");
        var nome = document.getElementById("print_nome");
        var email = document.getElementById("print_mail");

        var span_msg = document.getElementById("span_msg");

        username.innerHTML = data.username;
        userText.innerHTML ='Usuario comum';
        nome.innerHTML = localStorage.nome;
        email.innerHTML = data.email;


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




