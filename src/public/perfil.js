window.onload =  index_perfil();
window.addEventListener("load", () => {
  sessionStorage.cod_tarefa = 0;
  timeInterval_20secs(index_perfil);


  document.getElementById("deslogar").addEventListener("click", () => {
    sessionStorage.clear();
    location.assign("/");
  })
  
})

var timeInterval_20secs = (nomeFuncao) => {
  window.setInterval(nomeFuncao, 20000);
  window.setInterval(() => {
    console.log("20secs, REFRESH");
  }, 20000);
}

var timeInterval_3secs = (nomeFuncao) => {
  window.setInterval(nomeFuncao, 3000);
  window.setInterval(() => {
    console.log("3secs, REFRESH");
  }, 3000);
}

var timeOut_global = (nomeFuncao, ms) => {
  window.setTimeout(nomeFuncao, ms);
  window.setTimeout(() => {
    console.log("REFRESH");
  }, ms);
}


function index_perfil() {
    if (sessionStorage.cod_usuario) {
      var cod_usuario = sessionStorage.cod_usuario;
      $.ajax({
        url: `http://localhost:3000/v1/api/index/perfil/${cod_usuario}`, // Url of backend (can be python, php, etc..)
        type: "GET", // data type (can be get, post, put, delete)
        async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response) {
          var data = response;
          var section = document.querySelector("#root");
          var span_msg = document.getElementById("span_msg");
          section.innerHTML = "";
            let template = `
                              <div class = "box">
                              <h2>Username: ${data.username}</h2>
                              <h2>Nome: ${data.nome} </h2>
                              <h2>Email: ${data.email} </h2>
                              <h2>Conta criada em: ${data.data_entrada}</h2>
                              <h2>Data de ultima alteração: ${data.data_entrada}</h2>                
                              </div>
                              `;
            section.innerHTML += template;
        },
        error: function (response) {
          span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
          span_msg.hidden = false;
        }
      })
    }
    else {
      window.location.assign("401");
    }
  }