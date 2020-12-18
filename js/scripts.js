function logar() {
  var userjson = validateUsernameInput();

  var pacote = {
    method: "POST",
    body: JSON.stringify(userjson),
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch("https://tech-insiders.herokuapp.com/login", pacote)
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("loggeduser", JSON.stringify(res));
      window.location = "telaagente.html";
    })
    .catch((err) => {
      window.alert("Login inválido");
      window.location = "login.html";
    });
}

function validateUsernameInput() {
  const username = document.getElementById("txtusername").value;
  const senha = document.getElementById("txtsenha").value;
  if (username.indexOf("@") > -1) {
    return ({
      "email": username,
      "senha": senha
    })
  } else {
    return ({
      "racf": username,
      "senha": senha
    })
  }
}

function logout() {
  localStorage.removeItem("loggeduser");
  window.location = "login.html";
}

function carregarpagina() {
  exibirusuario();
  listartopagente();
}

function exibirusuario() {
  var usuariostr = localStorage.getItem("loggeduser");
  if (usuariostr == null) {
    window.location = "login.html";
  } else {
    var usuariojson = JSON.parse(usuariostr);
    document.getElementById("foto").innerHTML = "<img onerror=\"this.onerror=null; this.src='../images/default.png'\" src=\"../images/" + usuariojson.foto + "\" width=75px>"
    document.getElementById("racf").innerHTML = "<h6>" + usuariojson.nome + " (" + usuariojson.racf + ")" + "</h6>";
  }
}

function listartopagente() {
  fetch("https://tech-insiders.herokuapp.com/topagentes")
    .then((res) => res.json())
    .then((res) => preencherelementos(res));
}

function preencherelementos(lista) {
  preenchertabela(lista);
  preencherdrop(lista);
}

function preenchertabela(lista) {
  var saida =
    "<table class=\"table table-hover table-sm\">" +
    "<thead>" +
    "<tr>" +
    "<th scope='col'>Nº</th>" +
    "<th scope='col'>Parceiro</th>" +
    "<th scope='col'>Volume Transacional</th>" +
    "</tr>" +
    "</thead>"
  "<tbody>";

  for (contador = 0; contador < lista.length; contador++) {
    saida +=
      "<tr>" +
      "<td scope='row'>" + (contador + 1) + "</td>" +
      "<td scope='row'>" + lista[contador].nome_agente + "</td>" +
      "<td scope='row'>" + lista[contador].volume_transacional + "</td>" +
      "</tr>";
  }

  saida += "</tbody></table>";
  document.getElementById("tbparceiro").innerHTML = saida;
}

function preencherdrop(lista) {
  var saida = "";
  for (contador = 0; contador < lista.length; contador++) {
    saida += "<a class='dropdown-item' href=\"transaction.html?id=" + lista[contador].id_agente + "\">" + lista[contador].nome_agente + "</a>";
  }
  document.getElementById("dropagente").innerHTML = saida;
}

function carregartransactions() {
  exibirusuario();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  getagente(id)
  listarsucesso(id);
  listarfalhas(id);
  listarfraudes(id);
  listartotal(id);
}

function getagente(id) {
  fetch("https://tech-insiders.herokuapp.com/agente/" + id)
    .then((res) => res.json())
    .then((res) => document.getElementById("nome").innerHTML = "<span>" + res.nome_agente + " / " + res.volume_transacional + "</span>");
}

function listarsucesso(id) {
  fetch("https://tech-insiders.herokuapp.com/successtransactions/" + id)
    .then((res) => res.json())
    .then((res) => document.getElementById("sucesso").innerHTML = "<span>" + res + "</span>");
}

function listarfalhas(id) {
  fetch("https://tech-insiders.herokuapp.com/failedtransactions/" + id)
    .then((res) => res.json())
    .then((res) => document.getElementById("falhas").innerHTML = "<span>" + res + "</span>");
}

function listarfraudes(id) {
  fetch("https://tech-insiders.herokuapp.com/fraudtransactions/" + id)
    .then((res) => res.json())
    .then((res) => document.getElementById("fraudes").innerHTML = "<span>" + res + "</span>");
}

function listartotal(id) {
  fetch("https://tech-insiders.herokuapp.com/totaltransactions/" + id)
    .then((res) => res.json())
    .then((res) => document.getElementById("total").innerHTML = "<span>" + res + "</span>");
}

function voltar() {
  window.location = "telaagente.html";
}