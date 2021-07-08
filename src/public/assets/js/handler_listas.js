import { deslogar, timeInterval_20secs, timeInterval_3secs, timeOut_global, timeInterval_global, dismissable_warning_Msg, dismissable_sucess_Msg } from './common.js';


window.onload = function () {
    if (localStorage.cod_usuario != 0 && localStorage.cod_usuario && localStorage.cod_usuario != null) {
        index_listas();
        timeOut_global(deslogar, 1500);
        timeInterval_global(index_listas, 30000);
        localStorage.cod_lista = 0;

    }
    else {
        window.location.assign("/")
    }
}


function acoesLista() {
    document.querySelectorAll('.btnslistas').forEach(item => {
        item.addEventListener('click', e => {
            if (e.target !== e.currentTarget) {
                if (e.target.id == "showTarefas") {
                    var codLista = e.target.value;
                    localStorage.cod_lista = codLista;
                    location.assign('tarefas');
                }
                else if (e.target.id == "addTarefa") {
                    var codLista = e.target.value;
                    localStorage.cod_lista = codLista;
                    location.assign('adicionarTarefa');
                }
                else if (e.target.id == "EditarLista") {
                    var codLista = e.target.value;
                    localStorage.cod_lista = codLista;
                    location.assign('editarLista');
                }
                else if (e.target.id == "DeletarLista") {
                    var codLista = e.target.value;
                    excluirLista(codLista);
                    timeOut_global(index_listas, 2000);
                }

            }
            e.stopPropagation();
        })
    })
}

function searchListas() {
    $('#buscarListas').on("submit", (event) => {
        event.preventDefault();
        var valor = document.getElementById("buscaLista").value;
        if (valor != "") {
            buscarListas(valor);
            document.getElementById("buscaLista").value = "";
            timeOut_global(acoesLista, 500);
        }
        else {
            index_listas();
            timeOut_global(acoesLista, 500);
        }
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
            if (response.msg === 1451) {
                span_msg.innerHTML = dismissable_warning_Msg("Lista possui tarefas filhas");
                span_msg.hidden = false;
            }
            else {
                span_msg.innerHTML = dismissable_warning_Msg(response.msg);
                span_msg.hidden = false;
            }

        }
    })
}




function index_listas() {
    var cod_usuario = localStorage.cod_usuario;
    $.ajax({
        url: "http://localhost:3000/v1/api/index/listperUser", // Url of backend (can be python, php, etc..)
        type: "GET", // data type (can be get, post, put, delete)
        data: { cod_usuario: cod_usuario }, // data in json format
        async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response) {
            var data = response;
            var span_msg = document.getElementById("span_msg");

            $("table > tbody").empty();
            for (let i = 0; i < data.lista.length; i++) {
                var nomeLista = data.lista[i].nome_lista;
                var categoria = data.lista[i].categoria;
                var cod_lista = data.lista[i].cod_lista;
                $('table').find('tbody')
                    .append(
                        `<tr>
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm mx-2">${nomeLista}</h6>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-xs font-weight-bold mb-0">${categoria}</p>
                                    
                                    </td>
                                    <td class="d-flex align-content-center  flex-wrap">
                                    <div class="btnslistas">
                                    <button id="showTarefas" value="${cod_lista}" class="btn btn-primary">Tarefas</button>
                                    <button id="addTarefa" value="${cod_lista}" class="btn btn-primary">Adicionar Tarefa</button>
                                    <button id="EditarLista" value="${cod_lista}" class="btn btn-primary">Editar</button>
                                    <button id="DeletarLista" value="${cod_lista}" class="btn btn-primary">Excluir</button>
                                    </div>
                                    </td>
                                </tr>
                             `);

            }

            timeOut_global(acoesLista, 500);
            timeOut_global(searchListas, 500);

        },
        error: function (response) {
            span_msg.innerHTML += dismissable_warning_Msg(response.responseJSON.msg);
            span_msg.hidden = false;
        }
    })

}



function buscarListas(nome) {
    var cod_usuario = localStorage.cod_usuario;
    $.ajax({
        url: `http://localhost:3000/v1/api/list/?cod_usuario=${cod_usuario}&nome=${nome}`, // Url of backend (can be python, php, etc..)
        type: "GET", // data type (can be get, post, put, delete)

        async: true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
        success: function (response) {
            var data = response;
            var span_msg = document.getElementById("span_msg");
            $('table').find('td').remove();
            for (let i = 0; i < data.lista.length; i++) {
                var nomeLista = data.lista[i].nome_lista;
                var categoria = data.lista[i].categoria;
                var cod_lista = data.lista[i].cod_lista;
                $('table').find('tbody')
                    .append(
                        `<tr>
                <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm mx-2">${data.lista[i].nome_lista}</h6>
                        </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0">${data.lista[i].categoria}</p>
                    
                    </td>
                    <td class="d-flex align-content-center  flex-wrap">
                    <div class="btnslistas">
                    <button id="showTarefas" value="${data.lista[i].cod_lista}" class="btn btn-primary">Tarefas</button>
                    <button id="addTarefa" value="${data.lista[i].cod_lista}" class="btn btn-primary">Adicionar Tarefa</button>
                    <button id="EditarLista" value="${data.lista[i].cod_lista}" class="btn btn-primary">Editar</button>
                    <button id="DeletarLista" value="${data.lista[i].cod_lista}" class="btn btn-primary">Excluir</button>
                    </div>
                    </td>
                </tr>
                        `);
            }
            timeOut_global(acoesLista, 500);
            timeOut_global(searchListas, 500);
        },
        error: function (response) {
            if (response.status === 404) {
                $('table').find('td').remove();
                span_msg.innerHTML = dismissable_warning_Msg(`Nenhuma Lista ${nome} disponivel.`);
                span_msg.hidden = false;
            }

        }
    })

}



