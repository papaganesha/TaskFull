 window.addEventListener("load",() =>{

  document.getElementById("deslogar").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.assign("/");
 })

 document.getElementById("adicionarBTN").addEventListener("click", ()=>{
      adicionarTarefa();
 })
})
   



function adicionarTarefa(){
  if (sessionStorage.cod_usuario) {
    var nomeTarefa = document.getElementById("nomeTarefa");
    var descricao = document.getElementById("descricao");
    var spanMsg = document.getElementById("span_msg");
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
                span_msg.innerHTML = dismissable_sucess_Msg(response.msg);
                span_msg.hidden = false;
               
           },
           error: function (response) {
               if(response.responseJSON.msg.errno === 1062){
                 span_msg.innerHTML = dismissable_warning_Msg("Tarefa já existente");
                 span_msg.hidden = false;
                  nomeTarefa = "";
                  descricao = "";
               }else{
                 span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
                 span_msg.hidden = false;
                 nomeTarefa = "";
                  descricao = "";
               }
           }
       })
  }else{
       span_msg.innerHTML = dismissable_warning_Msg("Preencha todos os campos");
       span_msg.hidden = false;
       nomeTarefa = "";
       descricao = "";
  }
}
else {
    window.location.assign("401");
  }
}






function pegarListas(){
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
      if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          var listas;
          var codLista1 = data.lista[0].cod_lista;
          var nomeLista1 = data.lista[0].nome_lista;
          var codLista2 = data.lista[1].cod_lista;
          var nomeLista2 = data.lista[1].nome_lista;
          var tolog;
          //tolog = JSON.stringify({ cod_lista : codLista1 ,nome_lista: nomeLista1}); 
          //tolog += ","+JSON.stringify({ cod_lista : codLista2 ,nome_lista: nomeLista2}); 
          //console.log(tolog);
          for (let i = 0; i < data.lista.length; i++) {
            var codLista = data.lista[i].cod_lista;
            var nomeLista = data.lista[i].nome_lista;
            if(i === 0){
              tolog = JSON.stringify({ cod_lista : codLista ,nome_lista: nomeLista}); 
            }
            else{
              tolog += ","+JSON.stringify({ cod_lista : codLista ,nome_lista: nomeLista}); 
            }
            
          }
          console.log(tolog);

          return tolog;

      }
  };
  xhttp.open("GET", "http://localhost:3000/v1/api/index/list", true);
  xhttp.send();
}




function dismissable_sucess_Msg(msg){
    return `
    <div class="alert alert-success  alert-dismissible fade show" role="alert">
    <strong>Tudo Certo!</strong>${" "}${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
    `
}


function dismissable_warning_Msg(msg){
  return `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Erro!</strong>${" "}${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  `
}