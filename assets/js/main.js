document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('#donate .btn');
  const overlay = document.querySelector('.overlay');
  const dialog = document.querySelector('.dialog');
  const closeBtn = document.querySelector('.close-btn');
  const donationButtons = document.querySelectorAll('.donation-row button');
  const confirmBtn = document.querySelector('.primary');
  const cancelBtn = document.querySelector('.secondary');

  if (!openBtn || !overlay) return; 

  let lastFocus;

  // abrir modal
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    lastFocus = document.activeElement;
    overlay.classList.add('open');
    overlay.removeAttribute('hidden');
    dialog.focus();
  });

  // fechar modal
  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('hidden', 'true');
    lastFocus?.focus();
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // selecionar valor
  donationButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      donationButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // confirmar doação
  confirmBtn.addEventListener('click', () => {
    const selected = document.querySelector('.donation-row button[aria-pressed="true"]');
    if (!selected) {
      alert('Selecione um valor antes de confirmar.');
      return;
    }
    alert(`Doação confirmada: ${selected.textContent}`);
    closeModal();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Menu Hamburguer
  // ==========================
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuToggle && nav) { // só roda se existir
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
      menuToggle.classList.toggle("active");
      nav.classList.toggle("open");
    });

    // Fecha menu com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  // ==========================
  // Submenus acessíveis
  // ==========================
  const submenuParents = document.querySelectorAll(".has-submenu");
  if (submenuParents.length) {
    submenuParents.forEach(parent => {
      const link = parent.querySelector("a");
      const submenu = parent.querySelector(".submenu");
      if (!link) return; // evita erro se link não existir

      link.setAttribute("aria-haspopup", "true");
      link.setAttribute("aria-expanded", "false");
      if (submenu) submenu.setAttribute("aria-hidden", "true");

      link.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = parent.classList.contains("active");
        parent.classList.toggle("active", !isOpen);
        link.setAttribute("aria-expanded", !isOpen);
        if (submenu) submenu.setAttribute("aria-hidden", isOpen);
      });

      link.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && parent.classList.contains("active")) {
          parent.classList.remove("active");
          link.setAttribute("aria-expanded", "false");
          if (submenu) submenu.setAttribute("aria-hidden", "true");
          link.focus();
        }
      });
    });
  }


  // ==========================
  // GERAÇÃO DE CARDS DE PROJETOS
  // ==========================
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
        descricao: "Centros de ensino, com aulas de dança, capoeira, artes e muito mais.",
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

  // ==========================
  // VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
  // ==========================
  const form = document.getElementById("cadastroForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;
      form.querySelectorAll(".error-message").forEach(el => el.remove());

      // Validações (nome, email, cpf, telefone, etc.)
      const nome = form.nome;
      if (nome.value.trim().length < 3) {
        showError(nome, "O nome deve ter pelo menos 3 caracteres.");
        isValid = false;
      }
      const email = form.email;
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError(email, "Digite um e-mail válido.");
        isValid = false;
      }
      const cpf = form.cpf;
      if (!cpf.value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
        showError(cpf, "Digite um CPF válido no formato 000.000.000-00.");
        isValid = false;
      }
      const telefone = form.telefone;
      if (!telefone.value.match(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/)) {
        showError(telefone, "Digite um telefone válido, ex: (11) 90000-0000.");
        isValid = false;
      }
      const nascimento = form.nascimento;
      if (!nascimento.value) {
        showError(nascimento, "Informe sua data de nascimento.");
        isValid = false;
      }
      const cep = form.cep;
      if (!cep.value.match(/^\d{5}-\d{3}$/)) {
        showError(cep, "Digite um CEP válido, ex: 12345-678.");
        isValid = false;
      }
      if (!form.endereco.value.trim()) {
        showError(form.endereco, "Informe seu endereço.");
        isValid = false;
      }
      if (!form.cidade.value.trim()) {
        showError(form.cidade, "Informe sua cidade.");
        isValid = false;
      }
      if (!form.estado.value) {
        showError(form.estado, "Selecione um estado.");
        isValid = false;
      }
      if (!form.tipo.value) {
        showError(form.tipo, "Selecione uma opção.");
        isValid = false;
      }
       if (!form.genero.value) {
        showError(form.genero, "Selecione uma opção.");
        isValid = false;
      }

      if (isValid) {
        alert("Cadastro enviado com sucesso!");
        form.reset();
      }
    });

    function showError(element, message) {
      const error = document.createElement("div");
      error.className = "error-message";
      error.style.color = "red";
      error.style.fontSize = "0.9em";
      error.textContent = message;
      element.insertAdjacentElement("afterend", error);
    }
  }

});


