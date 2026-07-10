const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");
});

const linksDoMenu = menu.querySelectorAll("a");
linksDoMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
  });
});

const campoBusca = document.getElementById("busca-professor");
const cardsProfessores = document.querySelectorAll(".card-professor");
const mensagemSemResultado = document.getElementById("sem-resultado");

campoBusca.addEventListener("input", function () {
  const termoBuscado = campoBusca.value.toLowerCase();
  let quantidadeEncontrada = 0;

  cardsProfessores.forEach(function (card) {
    const textoDoCard = card.textContent.toLowerCase();

    if (textoDoCard.includes(termoBuscado)) {
      card.style.display = "block";
      quantidadeEncontrada++;
    } else {
      card.style.display = "none";
    }
  });

  if (quantidadeEncontrada === 0) {
    mensagemSemResultado.style.display = "block";
  } else {
    mensagemSemResultado.style.display = "none";
  }
});
