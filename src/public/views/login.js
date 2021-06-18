

window.addEventListener("load", () => {
  document.getElementById("loginBTN").addEventListener("click", () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var spanMsg = document.getElementById("span_msg");
    if (username && password) {
      logar(username, password);
    }
    else{
      span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
      span_msg.hidden = false;
    }
  })
})


function logar(username, password) {
  var formData = { username: username, password: password }; //Array 
  $.ajax({
    url: "http://localhost:3000/v1/api/auth/login", // Url of backend (can be python, php, etc..)
    type: "POST", // data type (can be get, post, put, delete)
    data: formData, // data in json format
    async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    success: function (response) {
      window.location.assign("listas");
      sessionStorage.cod_usuario = response.cod_usuario;
    },
    error: function (response) {
      span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
      span_msg.hidden = false;

    }
  });
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