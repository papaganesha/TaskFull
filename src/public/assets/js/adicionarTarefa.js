import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function() {
  if (sessionStorage.cod_usuario && sessionStorage.cod_usuario != null) {
    document.getElementById("busca").innerHTML += sessionStorage.nome;   
    window.addEventListener("load",() =>{
    
    })
  }
  else {
    window.location.assign("401")
  }
}

  

function adicionarTarefa(){
    var nomeTarefa = document.getElementById("nomeTarefa");
    var descricao = document.getElementById("descricao");
    var span_msg = document.getElementById("span_msg");
    var cod_lista = sessionStorage.cod_lista;
  if(nomeTarefa && descricao){
       nomeTarefa = nomeTarefa.value;
       descricao = descricao.value;
       var formData = {cod_lista : cod_lista, nome: nomeTarefa, descricao: descricao };
       $.ajax({
           url: "http://localhost:3000/v1/api/create/task",   // Url of backend (can be python, php, etc..)
           type: "POST", // data type (can be get, post, put, delete)
           data: formData, // data in json format
           async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
           success: function (response) {
                span_msg.innerHTML += customAlert_sucess(response.msg, 3000);
                span_msg.hidden = false;
               
           },
           error: function (response) {
               if(response.responseJSON.msg.errno === 1062){
                 span_msg.innerHTML += dismissable_warning_Msg("Tarefa já existente");
                 span_msg.hidden = false;
             
               }else{
                 span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
                 span_msg.hidden = false;
               
               }
           }
       })
  }else{
       span_msg.innerHTML += dismissable_warning_Msg("Preencha todos os campos");
       span_msg.hidden = false;
   
  }
}





function customAlert_sucess(msg,duration)
{
  var styler = document.createElement("div");
  styler.setAttribute("style","border: solid 5px Red;width:auto;height:auto;top:50%;left:40%;background-color:#444;color:Silver");
 styler.innerHTML = "<h1>"+msg+"</h1>";
 setTimeout(function()
 {
   styler.parentNode.removeChild(styler);
 },duration);
 document.body.appendChild(styler);
}
  function caller()
  {
    customAlert("This custom alert box will be closed in 2 seconds","2000");
  }


