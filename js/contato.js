const formContato = document.getElementById("form-contato");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

const campoNome = document.getElementById("contato-nome");
const campoEmail = document.getElementById("contato-email");
const campoAssunto = document.getElementById("contato-assunto");
const campoMensagem = document.getElementById("contato-mensagem");


function marcarCampo(campo, valido) {
  const grupo = campo.closest(".grupo-campo");

  if (valido) {
    grupo.classList.remove("campo-invalido");
  } else {
    grupo.classList.add("campo-invalido");
  }
}

formContato.addEventListener("submit", function (evento) {
  evento.preventDefault();

  let formularioValido = true;

  if (campoNome.value.trim().length < 3) {
    marcarCampo(campoNome, false);
    formularioValido = false;
  } else {
    marcarCampo(campoNome, true);
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(campoEmail.value.trim())) {
    marcarCampo(campoEmail, false);
    formularioValido = false;
  } else {
    marcarCampo(campoEmail, true);
  }

  if (campoAssunto.value.trim() === "") {
    marcarCampo(campoAssunto, false);
    formularioValido = false;
  } else {
    marcarCampo(campoAssunto, true);
  }

  if (campoMensagem.value.trim().length < 10) {
    marcarCampo(campoMensagem, false);
    formularioValido = false;
  } else {
    marcarCampo(campoMensagem, true);
  }

  if (!formularioValido) {
    mensagemSucesso.classList.remove("mostrar");
    return;
  }

  mensagemSucesso.textContent = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
  mensagemSucesso.classList.add("mostrar");

  formContato.reset();
});
