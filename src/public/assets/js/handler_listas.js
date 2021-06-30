import {timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg} from './common.js';


window.onload = function(){
if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
    document.getElementById("busca").innerHTML = localStorage.nome;
    index_listas();
    window.addEventListener("load", () => {
        timeInterval_global(index_listas, 30000);
        localStorage.cod_lista = 0;
    })
}
else{
    window.location.assign("401")
}
}



function mostrarTarefas(obj){
    var codLista = obj.value;
    localStorage.cod_lista = codLista;
    window.location.assign("tarefas");
} 

function adicionarTarefa(obj){
    var codLista = obj.value;
    localStorage.cod_lista = codLista;
    window.location.assign("adicionarTarefa");
} 


function editarLista(obj){
    var codLista = obj.value;
    localStorage.cod_lista = codLista;
    window.location.assign("editarLista");
}     


function deletarLista(obj){
    var codLista = obj.value;
    excluirLista(codLista);
    timeOut_global(index_listas, 1000);
}

function botoesExcluir() {
    let elementsArray = document.querySelectorAll("#btnExcluirLista");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", () => {
            
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
    if (localStorage.cod_usuario) {
        var cod_usuario = localStorage.cod_usuario;
        $.ajax({
            url: "http://localhost:3000/v1/api/index/listperUser", // Url of backend (can be python, php, etc..)
            type: "GET", // data type (can be get, post, put, delete)
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
                            
                            <button onclick="editarLista(this)" value="${data.lista[i].cod_lista}" class="btn btn-primary" id="btnEditarLista">Editar</button>
                            <button onclick="deletarLista(this)" value="${data.lista[i].cod_lista}" class="btn btn-primary" id="btnExcluirLista">Excluir</button>
                            <button onclick="adicionarTarefa(this)" value="${data.lista[i].cod_lista}" class="btn btn-primary" id="btnAdicionarTarefa">Adicionar Tarefa</button>
                            <button onclick="mostrarTarefas(this)" value="${data.lista[i].cod_lista}" class="btn btn-primary" id="mostrarTarefas">Ver Tarefas</button>

                

                            <br>
                        </dl>
                        
                        `;
                    section.innerHTML += template;
                }
            },
            error: function (response) {
                span_msg.innerHTML += dismissable_warning_Msg(response);
                span_msg.hidden = false;
            }
        })
    }
    else {
        window.location.assign("401");
    }
}



function mostrarTarefasxxx(){
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