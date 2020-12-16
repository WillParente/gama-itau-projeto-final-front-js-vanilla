function exibirusuario() {
  var user = localStorage.getItem("loggeduser");
  if (user == null) {
    window.location = "./login.html";
  } else {
    var userjson = JSON.parse(user);
    document.getElementById("dados").innerHTML =
      "<h4>Usuário: " +
      usuariojson.nome +
      "<br>" +
      "Email: " +
      usuariojson.email +
      "(" +
      usuariojson.id +
      ")<h4>";

    document.getElementById("foto").innerHTML =
      "<img alt='Não existe imagem' width='40%' heigth='80%' src=images/" +
      usuariojson.foto +
      ">";
  }
}

function logar() {
  var userjson = validateUsernameInput();

  var pacote = {
    method: "POST",
    body: JSON.stringify(userjson),
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch("http://localhost:8080/login", pacote)
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("userlogado", JSON.stringify(res));
      window.location = "./usuario.html";
    })
    .catch((err) => {
      window.alert("Login inválido");
      window.location = "./login.html";
    });
}

function validateUsernameInput() {
  const username = document.getElementById("txtusername").value;
  const senha = document.getElementById("txtsenha").value,
  if(username.indexof("@") > -1) {
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