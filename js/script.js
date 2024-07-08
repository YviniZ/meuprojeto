// Função para carregar o conteúdo das páginas
function loadPage(page) {
  const mainContent = document.getElementById('main-content');

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
              <form>
                  <label for="nome">Nome:</label>
                  <input type="text" id="nome" name="nome" required>

                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" required>

                  <label for="mensagem">Mensagem:</label>
                  <textarea id="mensagem" name="mensagem" required></textarea>

                  <button type="submit">Enviar</button>
              </form>
          </section>
      `;

    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Mensagem enviada com sucesso!');
    });
  } else {
    mainContent.innerHTML = `<p>Página não encontrada.</p>`;
  }
}



function validarFormulario() {
  const telefoneInput = document.getElementById('telefone');
  const telefoneValue = telefoneInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

  // Verifica se o número de telefone tem exatamente 11 dígitos
  if (telefoneValue.length !== 11) {
    alert('Telefone precisa ter 11 números!');
    return false; // Impede o envio do formulário
  }

  // Formata os dois primeiros dígitos entre parênteses
  const ddd = telefoneValue.substring(0, 2);
  const numero = telefoneValue.substring(2);
  const telefoneFormatado = `(${ddd}) ${numero}`;

  // Atualiza o valor no campo de telefone
  telefoneInput.value = telefoneFormatado;

  return true; // Permite o envio do formulário
}


document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('open');
    mainNav.classList.toggle('open');
  });
});
