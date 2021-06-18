window.addEventListener("load", () => {
  document.getElementById("deslogar").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.assign("index");
  })
  document.getElementById("btn-editar").addEventListener("click", () => {
    editarLista();
  })
})


function editarLista() {
  if (sessionStorage.cod_usuario) {
    var cod_lista = sessionStorage.cod_lista;
    var nomeLista = document.getElementById("nomeLista").value;
    var categoria = document.getElementById("categoria").value;
    var spanMsg = document.getElementById("span_msg");
    var formData;
    console.log(cod_lista + " --- " + nomeLista + " --- " + categoria);
    if (nomeLista && categoria) {
      formData = {nome: nomeLista, categoria: categoria };
    }
    else if (nomeLista) {
      formData = { nome: nomeLista };
    }
    else if (categoria) {
      formData = { categoria: categoria };
    }
    else {
      span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
    }

    $.ajax({
      url: "http://localhost:3000/v1/api/update/list/"+cod_lista, // Url of backend (can be python, php, etc..)
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