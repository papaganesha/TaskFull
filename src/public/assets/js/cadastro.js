import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.addEventListener("load",()=>{
  
  localStorage.clear();
  $('form').on("submit", (event) => {
  formCadastro(event);
    })
  })

  

function formCadastro(event){
    event.preventDefault();
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
    var span_msg = document.getElementById("span_msg");
 
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
        if(response.responseJSON.msg.errno === 1062){
          console.log(response.responseJSON.msg);
          span_msg.innerHTML += dismissable_warning_Msg("Usuario já existente");
          span_msg.hidden = false;
          console.log("12");
      
        }else{
          span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
          span_msg.hidden = false;
        
        }
         
        
      }
  });
  }

  






