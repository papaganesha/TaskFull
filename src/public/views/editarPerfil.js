window.onload = function () {
  if (sessionStorage.cod_usuario != 0 && sessionStorage.cod_usuario && sessionStorage.cod_usuario != null) {
    document.getElementById("busca").innerHTML += sessionStorage.nome;   
    window.addEventListener("load", () => {
        document.getElementById("btn-editar").addEventListener("click", () => {
            editarPerfil();
        })
    })
  
  }
  else {
    window.location.assign("401");

  }
}

function deslogar() {
  sessionStorage.clear();
  window.location.assign("/");
}


function editarPerfil() {
  if (sessionStorage.cod_usuario) {
    var cod_usuario = sessionStorage.cod_usuario;
    var nomeUsuario = document.getElementById("nomeUsuario");
    var emailUsuario = document.getElementById("emailUsuario");
    var passwordUsuario = document.getElementById("passwordUsuario");
    var spanMsg = document.getElementById("span_msg");
    var formData;
    if (nomeUsuario && emailUsuario && passwordUsuario) {
      nomeUsuario = nomeUsuario.value;
      emailUsuario = emailUsuario.value;
      passwordUsuario = passwordUsuario.value;

      formData = { cod_usuario: cod_usuario, nome: nomeUsuario, email: emailUsuario, password: passwordUsuario };
    }

    else if (nomeUsuario && emailUsuario) {
      nomeUsuario = nomeUsuario.value;
      emailUsuario = emailUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario, email: emailUsuario };
    }

    else if (nomeUsuario && passwordUsuario) {
      nomeUsuario = nomeUsuario.value;
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario, password: passwordUsuario };
    }

    else if (emailUsuario && passwordUsuario) {
      emailUsuario = emailUsuario.value;
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, email: emailUsuario, password: passwordUsuario };
    }


    else if (nomeUsuario) {
      nomeUsuario = nomeUsuario.value;
      formData = { cod_usuario: cod_usuario, nome: nomeUsuario };
    }

    else if (emailUsuario) {
      emailUsuario = emailUsuario.value;
      formData = { cod_usuario: cod_usuario, email: emailUsuario };
    }

    else if (passwordUsuario) {
      passwordUsuario = passwordUsuario.value;
      formData = { cod_usuario: cod_usuario, password: passwordUsuario };
    }

    else {
      span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
    }
    console.log(cod_usuario + " --- " + nomeUsuario + " --- " + emailUsuario);

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