import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';



window.addEventListener("load", () => {
  localStorage.clear();
  
  $('form').on("submit", (event) => {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var spanMsg = document.getElementById("span_msg");
    if (username && password) {
      logar(username, password);
    }
    else {
      console.log("erro");
      span_msg.innerHTML = dismissable_warning_Msg("Insira os dados corretamente");
      span_msg.hidden = false;
    }

  })

})








function logar(username, password) {
  var formData = { username, password }; //Array 
    $.ajax({
      url: "http://localhost:3000/v1/api/auth/login", // Url of backend (can be python, php, etc..)
      type: "POST", // data type (can be get, post, put, delete)
      data: formData, // data in json format
      async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
      success: function (response) {
        localStorage.cod_usuario = response.jwt;
        localStorage.nome = response.nome;
        window.location.assign("listas");
      },
      error: function (response) {
        
        span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
        span_msg.hidden = false;

      }
  })
}




