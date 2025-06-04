// Menu Hambúrguer
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-nav');

  if (menuToggle && navLinks) {
    // Alternar o menu ao clicar no botão hambúrguer
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Evita que o clique propague para o body
      document.body.classList.toggle('menu-open');
      navLinks.classList.toggle('active');
    });

    // Fechar o menu ao clicar fora
    document.body.addEventListener('click', () => {
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        navLinks.classList.remove('active');
      }
    });

    // Evitar que cliques dentro do menu fechem o menu
    navLinks.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  } else {
    console.error("Elementos .menu-toggle ou .navbar-nav não encontrados.");
  }
});


// Exemplo de script para animações ou interações futuras
document.addEventListener("DOMContentLoaded", function () {
  console.log("Site carregado com sucesso!");

  // Exemplo: Adicionar classe 'active' ao link da página atual
  const currentPage = window.location.hash || "#";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// Animações ao rolar a página
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Remove o observador após a animação
      }
    });
  }, { threshold: 0.2 });

  // Aplicar animação aos elementos com a classe 'animate'
  document.querySelectorAll(".animate").forEach((element) => {
    observer.observe(element);
  });
});

// Máscara para telefone
$(document).ready(function () {
  $('#telefone-fixo').mask('(00) 0000-0000');
  $('#telefone-movel').mask('(00) 00000-0000');

  // Mostrar/esconder senha
  $('#toggle-senha').click(function () {
    const senhaInput = $('#senha');
    const tipo = senhaInput.attr('type') === 'password' ? 'text' : 'password';
    senhaInput.attr('type', tipo);
    $(this).find('i').toggleClass('fa-eye fa-eye-slash');
  });

  // Preview da foto de perfil
  $('#foto-perfil').on('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#preview-foto').attr('src', e.target.result).removeClass('d-none');
      };
      reader.readAsDataURL(file);
    }
  });

  // Validação básica do formulário
  $('#cadastro-form').on('submit', function (e) {
    e.preventDefault();
    alert('Cadastro realizado com sucesso!');
    // Aqui você pode redirecionar para a página pessoal do usuário
    window.location.href = 'pagina_pessoal.html';
  });
});

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}