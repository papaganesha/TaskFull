
window.addEventListener("load", ()=>{
  document.getElementById("btn-editar").addEventListener("click", ()=>{
      btnEditar();
})
})

function btnEditar(){
  if(sessionStorage.cod_usuario){
  var nomeTarefa = document.getElementById("nomeTarefa").value;
      var descricao = document.getElementById("descricao").value;
      var span_msg = document.getElementById("span_msg");
      var cod_tarefa = sessionStorage.cod_tarefa;
      if(nomeTarefa && descricao){
        var formData = {nome: nomeTarefa, descricao : descricao};
      }
      else if(nomeTarefa){
        var formData = {nome: nomeTarefa};
    
      }
      else if(descricao){
        var formData = {descricao: descricao};
    
      }
      else{
        span_msg.innerHTML =  "Não pode submeter sem pelo menos um campo de alteração"
      }
      $.ajax({
        url : `http://localhost:3000/v1/api/update/task/${cod_tarefa}`, // Url of backend (can be python, php, etc..)
        type: "PUT", // data type (can be get, post, put, delete)
        data : formData, // data in json format
          async : true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function(response) {
            span_msg.innerHTML =  response.msg;
            span_msg.hidden = false;
        },
        error: function (response) {
            span_msg.innerHTML =  response.responseJSON.msg;
            span_msg.hidden = false;
    
        }
    })
  }
    else {
      window.location.assign("401");
    }
}



  function dismissable_sucess_Msg(msg){
    return `
    <div class="alert alert-success  alert-dismissible fade show" role="alert">
    <strong>Tudo Certo!</strong>${" "}${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
  </div>
    `
}


function dismissable_warning_Msg(msg){
  return `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Erro!</strong>${" "}${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
</div>
  `
}