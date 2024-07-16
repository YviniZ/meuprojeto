const formulario = document.getElementById('formulario');
const toggleFormularioInsideBtn = document.getElementById('toggleFormularioInside');
const toggleIcon = document.getElementById('toggleIcon');
const mainContent = document.getElementById('main-content'); // Elemento principal de conteúdo

formulario.style.left = '20px'; // Inicialmente visível

toggleFormularioInsideBtn.addEventListener('click', function () {
  if (formulario.style.left === '20px') {
    formulario.style.left = '-336px';
    toggleIcon.src = 'images/icon-closed.png';
  } else {
    formulario.style.left = '20px';
    toggleIcon.src = 'images/icon-open.png';
  }
});

function enviarFormulario(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('contatoForm'));
  const submitButton = document.getElementById('submitButton');
  const formResponse = document.getElementById('formResponse');

  fetch('php/enviar_formulario.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        submitButton.style.display = 'none'; // Esconder o botão de enviar
        formResponse.style.display = 'block'; // Mostrar mensagem de sucesso
        formResponse.style.color = 'green';
        formResponse.textContent = data.message;

        // Limpar formulário após enviar com sucesso
        document.getElementById('contatoForm').reset();
      } else {
        formResponse.style.display = 'block'; // Mostrar mensagem de erro
        formResponse.style.color = 'red';
        formResponse.textContent = data.message;
      }
    })
    .catch(error => {
      formResponse.style.display = 'block'; // Mostrar mensagem de erro genérico
      formResponse.style.color = 'red';
      formResponse.textContent = 'Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.';
    });
}

// Função para carregar o conteúdo das páginas
function loadPage(page) {
  if (page === 'sobre') {
    mainContent.innerHTML = `
          <section id="sobre">
              <h2>Sobre Nós</h2>
              <img src="images/empresa.jpg" alt="Imagem da Empresa">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae quam aliquam pulvinar.</p>
          </section>
      `;
  } else if (page === 'servicos') {
    mainContent.innerHTML = `
          <section id="servicos">
              <h2>Nossos Serviços</h2>
              <p>Descrição dos serviços oferecidos pela empresa.</p>
          </section>
      `;
  } else if (page === 'contato') {
    mainContent.innerHTML = `
          <section id="contato">
              <h2>Contato</h2>
              <form id="contatoForm" onsubmit="enviarFormulario(event)">
                  <label for="nome">Nome:</label>
                  <input type="text" id="nome" name="nome" required>

                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" required>

                  <label for="telefone">Telefone:</label>
                  <input type="tel" id="telefone" name="telefone" placeholder="(DDD) Número" minlength="11" maxlength="15" required>

                  <label for="mensagem">Mensagem:</label>
                  <textarea id="mensagem" name="mensagem" rows="4" required></textarea>

                  <button type="submit" id="submitButton">Enviar</button>
                  <p id="formResponse" style="display:none;"></p>
              </form>
          </section>
      `;

    // Adicionar validação de telefone ao formulário
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function () {
      const telefoneValue = telefoneInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

      // Verifica se o número de telefone tem exatamente 11 dígitos
      if (telefoneValue.length === 11) {
        const ddd = telefoneValue.substring(0, 2);
        const numero = telefoneValue.substring(2);
        const telefoneFormatado = `(${ddd}) ${numero}`;
        telefoneInput.value = telefoneFormatado;
      }
    });

    const form = document.getElementById('contatoForm');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      enviarFormulario(event);
    });
  } else {
    mainContent.innerHTML = `<p>Página não encontrada.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleNav = document.getElementById("toggleNav");
  const mobileButtons = document.querySelector(".mobile-buttons");

  toggleNav.addEventListener("click", function () {
    mobileButtons.classList.toggle("show-buttons");
    toggleNav.classList.toggle("show-nav");
  });
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

