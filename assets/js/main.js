// ==========================
//  Menu Hamburguer
// ==========================
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");
  });
}
// ==========================
// GERAÇÃO DE CARDS DE PROJETOS
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".projects-grid");
  const template = document.querySelector("#project-card-template");

  if (grid && template) {
    const projetos = [
      {
        titulo: "Educação para Todos",
        descricao: "Oferecemos reforço escolar e cursos de capacitação gratuitos para jovens em vulnerabilidade.",
        imagem: "assets/images/projeto_educacao.png"
      },
      {
        titulo: "Saúde em Movimento",
        descricao: "Ações itinerantes de saúde básica e prevenção em comunidades afastadas.",
        imagem: "assets/images/projeto_saude.png"
      },
      {
        titulo: "Acolhimento Animal",
        descricao: "Resgate e cuidados veterinários para animais abandonados até sua adoção.",
        imagem: "assets/images/hero_missao.png"
      },
      {
        titulo: "Inclusão Social",
        descricao: "Inclusão social é garantir que todos tenham voz, oportunidades e participação plena na sociedade.",
        imagem: "assets/images/missao_banner_v14.png"
      },
      {
        titulo: "Meio Ambiente Sustentável",
        descricao: "Desfrutar hoje para recolher a amanhã.",
        imagem: "assets/images/sede_img.png"
      },
       {
        titulo: "Centro Cultural Comunitário",
        descricao: "Centros de ensino, com aulas de dança, campoeira, artes e muito mais.",
        imagem: "assets/images/projeto_educacao_v15.png"
      }
    ];

    projetos.forEach(p => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".project-img").src = p.imagem;
      clone.querySelector(".project-img").alt = p.titulo;
      clone.querySelector(".project-title").textContent = p.titulo;
      clone.querySelector(".project-desc").textContent = p.descricao;
      grid.appendChild(clone);
    });
  }
});
// ==============================
// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita envio automático

    let isValid = true;

    // limpa mensagens antigas
    form.querySelectorAll(".error-message").forEach(el => el.remove());

    // valida Nome
    const nome = form.nome;
    if (nome.value.trim().length < 3) {
      showError(nome, "O nome deve ter pelo menos 3 caracteres.");
      isValid = false;
    }

    // valida E-mail
    const email = form.email;
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError(email, "Digite um e-mail válido.");
      isValid = false;
    }

    // valida CPF (formato XXX.XXX.XXX-XX)
    const cpf = form.cpf;
    if (!cpf.value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      showError(cpf, "Digite um CPF válido no formato 000.000.000-00.");
      isValid = false;
    }

    // valida Telefone (formato (00) 90000-0000)
    const telefone = form.telefone;
    if (!telefone.value.match(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/)) {
      showError(telefone, "Digite um telefone válido, ex: (11) 90000-0000.");
      isValid = false;
    }

    // valida Nascimento
    const nascimento = form.nascimento;
    if (!nascimento.value) {
      showError(nascimento, "Informe sua data de nascimento.");
      isValid = false;
    }

    // valida CEP
    const cep = form.cep;
    if (!cep.value.match(/^\d{5}-\d{3}$/)) {
      showError(cep, "Digite um CEP válido, ex: 12345-678.");
      isValid = false;
    }

    // valida Endereço
    if (!form.endereco.value.trim()) {
      showError(form.endereco, "Informe seu endereço.");
      isValid = false;
    }

    // valida Cidade
    if (!form.cidade.value.trim()) {
      showError(form.cidade, "Informe sua cidade.");
      isValid = false;
    }

    // valida Estado
    if (!form.estado.value) {
      showError(form.estado, "Selecione um estado.");
      isValid = false;
    }

    // valida Tipo
    if (!form.tipo.value) {
      showError(form.tipo, "Selecione uma opção.");
      isValid = false;
    }

    if (isValid) {
      alert("Cadastro enviado com sucesso!");
      form.reset(); // limpa formulário
    }
  });

  // função para mostrar mensagem de erro
  function showError(element, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.9em";
    error.textContent = message;
    element.insertAdjacentElement("afterend", error);
  }
});

 