window.addEventListener("load",()=>{
  
  document.getElementById("cadastroBTN").addEventListener("click",()=>{
    formCadastro();
  })
})

function formCadastro(){
  var username = document.getElementById("username").value;
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if(username && nome && email && password){
      cadastrar(username, nome, email, password);
  }
  else{
    span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
    span_msg.hidden = false;
  }
}

function cadastrar(username, nome, email, password) {
    var formData = {username: username, nome: nome, email : email, password: password}; //Array
    var spanMsg = document.getElementById("span_msg");
 
    $.ajax({
      url : "http://localhost:3000/v1/api/auth/register", // Url of backend (can be python, php, etc..)
      type: "POST", // data type (can be get, post, put, delete)
      data : formData, // data in json format
        async : true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function(response) {
        span_msg.innerHTML = dismissable_sucess_Msg(response.msg);
        span_msg.hidden = false;
      },
      error: function (response) {
          console.log(response.responseJSON.msg);
          span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
          span_msg.hidden = false;
        
      }
  });
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