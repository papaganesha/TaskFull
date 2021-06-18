window.onload = index_listas();
window.addEventListener("load", () => {
    sessionStorage.cod_lista = 0;
    document.getElementById("deslogar").addEventListener("click", () => {
        sessionStorage.clear();
        window.location.assign("/");
    })

    timeInterval_20secs(index_listas);
    mostrarTarefas();
    botoesAdicionarTarefa();
    botoesEditar();
    botoesExcluir();

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

function mostrarTarefas(){
        let elementsArray = document.querySelectorAll("#mostrarTarefas");
        elementsArray.forEach(function (elem) {
            elem.addEventListener("click", () => {
                var codLista = elem.value;
                sessionStorage.cod_lista = elem.value;
                location.assign("tarefas");
            })
        })
    }



function botoesEditar() {
    let elementsArray = document.querySelectorAll("#btnEditarLista");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", () => {
            var codLista = elem.value;
            console.log(codLista);
            sessionStorage.cod_lista = codLista;
            window.location.assign("editarLista");
        })
    })
}


function botoesAdicionarTarefa() {
    let elementsArray = document.querySelectorAll("#btnAdicionarTarefa");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", () => {
            var codLista = elem.value;
            console.log(codLista);
            sessionStorage.cod_lista = codLista;
            window.location.assign("adicionarTarefa");
        })
    })
}


function botoesExcluir() {
    let elementsArray = document.querySelectorAll("#btnExcluirLista");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", () => {
            var codLista = elem.value;
            excluirLista(codLista);
            timeOut_global(index_listas, 500);
        })
    })

}

function excluirLista(codLista) {
    $.ajax({
        url: "http://localhost:3000/v1/api/delete/list/" + codLista, // Url of backend (can be python, php, etc..)
        type: "DELETE", // data type (can be get, post, put, delete)
        async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response) {
            span_msg.innerHTML = dismissable_sucess_Msg(response.msg);
            span_msg.hidden = false;

        },
        error: function (response) {
            console.log(typeof (response.responseJSON.msg));
            var data = response.responseJSON.msg;
            if (data === 1451) {
                span_msg.innerHTML = dismissable_warning_Msg("Lista possui tarefas filhas");
                span_msg.hidden = false;
            }
            else {
                span_msg.innerHTML = dismissable_warning_Msg(response.responseJSON.msg);
                span_msg.hidden = false;
            }
            return response;

        }
    })
}




function index_listas() {
    if (sessionStorage.cod_usuario) {
        var cod_usuario = sessionStorage.cod_usuario;
        $.ajax({
            url: "http://localhost:3000/v1/api/index/listperUser", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            data: { cod_usuario: cod_usuario }, // data in json format
            async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
            success: function (response) {
                var data = response;
                var section = document.querySelector("#root");
                section.innerHTML = "";
                for (let i = 0; i < data.lista.length; i++) {
                    let template = `
                        <dl class = "box" id = "box">
                        
                        <br> 
                            <dt>
                       
                                <a  href="#"> ${data.lista[i].nome_lista} </a>

                                </dt>
                            <br>
                            <dd>
                                 Categoria: ${data.lista[i].categoria}
                            </dd>
                            <dd>
                                 Criada em: ${data.lista[i].data_entrada}
                            </dd>
                            <br>
                            <button value="${data.lista[i].cod_lista}" class="btn btn-primary" id="btnEditarLista">Editar</button>
                            <button value="${data.lista[i].cod_lista}" class="btn btn-primary" id="btnExcluirLista">Excluir</button>
                            <button value="${data.lista[i].cod_lista}" class="btn btn-primary" id="btnAdicionarTarefa">Adicionar Tarefa</button>
                            <button value="${data.lista[i].cod_lista}" class="btn btn-primary" id="mostrarTarefas">Ver Tarefas</button>

                

                            <br>
                        </dl>
                        
                        `;
                    section.innerHTML += template;
                }
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


function dismissable_sucess_Msg(msg) {
    return `
    <div class="alert alert-success  alert-dismissible fade show" role="alert">
    <strong>Tudo Certo!</strong>${" "}${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
    `
}

function dismissable_warning_Msg(msg) {
    return `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Erro!</strong>${" "}${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  `
}