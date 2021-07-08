import {capitalizeFirstLetter, deslogar ,timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function () {
  if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    timeOut_global(alterHome, 500);   
    timeOut_global(deslogar,500);   
    localStorage.cod_lista = 0;
    
  }
  else {
    window.location.assign("/");
  }
}

function alterHome(){
  var nome = localStorage.nome;
  nome = capitalizeFirstLetter(nome);
  document.getElementById("print_welcome").innerHTML += `Seja bem vindo ${nome}`;   
}
