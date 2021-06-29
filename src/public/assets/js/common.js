export function dismissable_sucess_Msg(msg){
    return `
     <div class="alert alert-success  alert-dismissible fade show" role="alert">
        <strong>Tudo Certo!</strong>${" "}${msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>
    `
}

export function dismissable_warning_Msg(msg){
    return `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Erro!</strong>${" "}${msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
}


export function deslogar() {
    sessionStorage.clear();
    window.location.assign("/");
  }


  export var timeInterval_20secs = (nomeFuncao) => {
    window.setInterval(nomeFuncao, 20000);
    window.setInterval(() => {
      console.log("20secs, REFRESH");
    }, 20000);
  }
  
  export var timeInterval_3secs = (nomeFuncao) => {
    window.setInterval(nomeFuncao, 3000);
    window.setInterval(() => {
      console.log("3secs, REFRESH");
    }, 3000);
  }
  
  export var timeOut_global = (nomeFuncao, ms) => {
    window.setTimeout(nomeFuncao, ms);
    window.setTimeout(() => {
      console.log("REFRESH");
    }, ms);
  }
  
  
  export var timeInterval_global = (nomeFuncao, ms) => {
    window.setInterval(nomeFuncao, ms);
    window.setInterval(() => {
      console.log(`REFRESH ${ms}ms`);
    }, ms);
  }