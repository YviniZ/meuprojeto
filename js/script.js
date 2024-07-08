document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('open');
    mainNav.classList.toggle('open');
  });

  const formulario = document.getElementById('formulario');
  const toggleFormularioInsideBtn = document.getElementById('toggleFormularioInside');
  const toggleIcon = document.getElementById('toggleIcon');

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

  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function () {
    const telefoneValue = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se o número de telefone tem exatamente 11 dígitos
    if (telefoneValue.length === 11) {
      const ddd = telefoneValue.substring(0, 2);
      const numero = telefoneValue.substring(2);
      const telefoneFormatado = `(${ddd}) ${numero}`;
      this.value = telefoneFormatado;
    }
  });
});
