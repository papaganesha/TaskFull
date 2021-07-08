import {capitalizeFirstLetter, deslogar, timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
      index_perfil();
      timeInterval_global(index_perfil, 30000);
      localStorage.cod_tarefa = 0;
  }
  else {
    window.location.assign("/");
  }
}




function index_perfil(){
    var cod_usuario = localStorage.cod_usuario;
    var span_msg = document.getElementById("span_msg");
    $.ajax({
      url: `http://localhost:3000/v1/api/index/perfil/`, // Url of backend (can be python, php, etc..)
      type: "POST",
      data: {cod_usuario: cod_usuario}, // data type (can be get, post, put, delete)
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
        var username = document.getElementById("print_username");
        var userText = document.getElementById("print_userText");
        var printNome = document.getElementById("print_nome");
        var printEmail = document.getElementById("print_mail") ;
        if(username && userText && printNome && printEmail){
          username.innerHTML  = capitalizeFirstLetter(localStorage.username);
          userText.innerHTML = 'Usuario comum';
          printNome.innerHTML  = capitalizeFirstLetter(response.nome);
          printEmail.innerHTML  = response.email;
        }
       
      },
      error: function (response) {
        console.log(response);

        span_msg.innerHTML = dismissable_warning_Msg(response);
        span_msg.hidden = false;
      }
    })
  
}




