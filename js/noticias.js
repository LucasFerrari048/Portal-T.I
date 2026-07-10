const CHAVE_STORAGE = "noticias-portal-ti";

// Selecionando os elementos que vamos usar
const formNoticia = document.getElementById("form-noticia");
const campoTitulo = document.getElementById("noticia-titulo");
const campoResumo = document.getElementById("noticia-resumo");
const listaNoticias = document.getElementById("lista-noticias");
const mensagemVazia = document.getElementById("sem-noticias");

function buscarNoticiasSalvas() {
  const dados = localStorage.getItem(CHAVE_STORAGE);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

function salvarNoticias(listaDeNoticias) {
  const dadosEmTexto = JSON.stringify(listaDeNoticias);
  localStorage.setItem(CHAVE_STORAGE, dadosEmTexto);
}

function criarCardDeNoticia(noticia) {
  const card = document.createElement("div");
  card.className = "card-noticia";

  const data = document.createElement("span");
  data.className = "data-noticia";
  data.textContent = noticia.data;

  const titulo = document.createElement("h3");
  titulo.textContent = noticia.titulo;

  const resumo = document.createElement("p");
  resumo.textContent = noticia.resumo;

  card.appendChild(data);
  card.appendChild(titulo);
  card.appendChild(resumo);

  return card;
}

function mostrarNoticiasNaTela() {
  const noticias = buscarNoticiasSalvas();

  listaNoticias.innerHTML = "";

  if (noticias.length === 0) {
    mensagemVazia.style.display = "block";
    return;
  }

  mensagemVazia.style.display = "none";

  noticias
    .slice()
    .reverse()
    .forEach(function (noticia) {
      const card = criarCardDeNoticia(noticia);
      listaNoticias.appendChild(card);
    });
}

formNoticia.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const titulo = campoTitulo.value.trim();
  const resumo = campoResumo.value.trim();

  const grupoTitulo = campoTitulo.closest(".grupo-campo");
  const grupoResumo = campoResumo.closest(".grupo-campo");

  let formularioValido = true;

  if (titulo === "") {
    grupoTitulo.classList.add("campo-invalido");
    formularioValido = false;
  } else {
    grupoTitulo.classList.remove("campo-invalido");
  }

  if (resumo === "") {
    grupoResumo.classList.add("campo-invalido");
    formularioValido = false;
  } else {
    grupoResumo.classList.remove("campo-invalido");
  }

  if (!formularioValido) {
    return;
  }

  const novaNoticia = {
    titulo: titulo,
    resumo: resumo,
    data: new Date().toLocaleDateString("pt-BR"),
  };

  const noticias = buscarNoticiasSalvas();
  noticias.push(novaNoticia);
  salvarNoticias(noticias);

  mostrarNoticiasNaTela();

  formNoticia.reset();
});

mostrarNoticiasNaTela();
