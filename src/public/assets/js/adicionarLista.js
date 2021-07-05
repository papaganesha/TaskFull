import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function() {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    $('form').on("submit", (event) => {
      event.preventDefault();
      var nomeLista = document.getElementById("nomeLista");
      var categoria = document.getElementById("categoria");
      var span_msg = document.getElementById("span_msg");
      if (nomeLista && categoria) {
        nomeLista = nomeLista.value;
        categoria = categoria.value;
        adicionarLista(nomeLista, categoria);
      }
      else {
        span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
        span_msg.hidden = false;
      }
  
    })
  }
  else{
      window.location.assign("401");
  }
}


function deslogar(){
  sessionStorage.clear();
  window.location.assign("/");
}



  function adicionarLista(nomeLista, categoria) {
    var span_msg = document.getElementById("span_msg");
    var cod_usuario = localStorage.cod_usuario;
    var formData = { cod_usuario: cod_usuario, nome: nomeLista, categoria: categoria };
      $.ajax({
        url: "http://localhost:3000/v1/api/create/list",   // Url of backend (can be python, php, etc..)
        type: "POST", // data type (can be get, post, put, delete)
        data: formData, // data in json format
        async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response) {
          span_msg.innerHTML = dismissable_sucess_Msg(response.msg);
          span_msg.hidden = false;

        },
        error: function (response) {
          console.log(1);
          if (response.responseJSON.msg.errno === 1062) {
            span_msg.innerHTML += dismissable_warning_Msg("Lista já existente");
            span_msg.hidden = false;
          } else {
            span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
            span_msg.hidden = false;
          }
        }
      })
    
    
   
  }



