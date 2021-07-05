import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    document.getElementById("print_welcome").innerHTML += `Seja bem vindo ${localStorage.nome}`;   
      localstorage.cod_tarefa = 0;
      
  }
  else {
    window.location.assign("401");
  }
}


