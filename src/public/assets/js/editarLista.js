import { dismissable_warning_Msg, dismissable_sucess_Msg, deslogar } from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    timeOut_global(formEditarLista, 500);
    timeOut_global(deslogar, 500);
  }
  else {
    window.location.assign("/");
  }
}


function formEditarLista() {
  $('form').on("submit", (event) => {
    event.preventDefault();
    var nomeLista = document.getElementById("nomeLista");
    var categoria = document.getElementById("categoria");
    var span_msg = document.getElementById("span_msg");
    var formData;
    if (nomeLista && categoria) {
      nomeLista = nomeLista.value;
      categoria = categoria.value;
      formData = { nome: nomeLista, categoria: categoria };
    }
    else if (nomeLista) {
      nomeLista = nomeLista.value;
      formData = { nome: nomeLista };
    }
    else if (categoria) {
      categoria = categoria.value;
      formData = { categoria: categoria };
    }
    else {
      span_msg.innerHTML += dismissable_warning_Msg("Insira os dados corretamente");
    }
    editarLista(formData);
  })
}



function editarLista(formData) {
  var cod_lista = localStorage.cod_lista;
  var span_msg = document.getElementById("span_msg");

  $.ajax({
    url: "http://localhost:3000/v1/api/update/list/" + cod_lista, // Url of backend (can be python, php, etc..)
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




