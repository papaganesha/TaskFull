import { deslogar, timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg } from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    timeOut_global(formEditarPerfil , 500);
    timeOut_global(deslogar , 500);
  }

  else {
    window.location.assign("/");
  }
}


function formEditarPerfil() {
  $('form').on("submit", function (e) {
    e.preventDefault();
    var cod_usuario = localStorage.cod_usuario;
    var nomeUsuario = document.getElementById("nomeUsuario");
    var emailUsuario = document.getElementById("emailUsuario");
    var passwordUsuario = document.getElementById("passwordUsuario");
    var span_msg = document.getElementById("span_msg");
    var formData;

    if (nomeUsuario && emailUsuario && passwordUsuario) {
      nomeUsuario = nomeUsuario.value;
      emailUsuario = emailUsuario.value;
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario, email: emailUsuario, password: passwordUsuario };
      editarPerfil(formData);
    }

    else if (nomeUsuario && emailUsuario) {
      nomeUsuario = nomeUsuario.value;
      emailUsuario = emailUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario, email: emailUsuario };
      editarPerfil(formData);
    }

    else if (nomeUsuario && passwordUsuario) {
      nomeUsuario = nomeUsuario.value;
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario, password: passwordUsuario };
      editarPerfil(formData);
    }

    else if (emailUsuario && passwordUsuario) {
      emailUsuario = emailUsuario.value;
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, email: emailUsuario, password: passwordUsuario };
      editarPerfil(formData);
    }


    else if (nomeUsuario) {
      nomeUsuario = nomeUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario };
      console.log(formData);

    }

    else if (emailUsuario) {
      emailUsuario = emailUsuario.value;
      formData = { cod_usuario: cod_usuario, email: emailUsuario };
      editarPerfil(formData);
    }

    else if (passwordUsuario) {
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, password: passwordUsuario };
      editarPerfil(formData);
    }

    else {
      span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
      span_msg.hidden = false;
    }
  })
}


function editarPerfil(formData) {
  var span_msg = document.getElementById("span_msg");
  $.ajax({
    url: "http://localhost:3000/v1/api/index/perfil", // Url of backend (can be python, php, etc..)
    type: "PUT", // data type (can be get, post, put, delete)
    data: formData, // data in json format
    async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    success: function (response) {
      span_msg.innerHTML = dismissable_sucess_Msg(response.msg);
      span_msg.hidden = false;

    },
    error: function (response) {
      span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
      span_msg.hidden = false;
    }
  })
}







