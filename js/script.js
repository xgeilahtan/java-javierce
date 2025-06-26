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

// ========================================================
// === LÓGICA DA PÁGINA DE AGENDAMENTO ===
// ========================================================
$(document).ready(function () {

    // Só executa o código se estivermos na página de agendamento
    // Isso evita erros em outras páginas do site.
    if ($('#booking-summary').length === 0) {
        return;
    }

    // --- 1. SELEÇÃO DE ELEMENTOS DO DOM (jQuery) ---
    const $serviceSelect = $('#service-select');
    const $professionalSelect = $('#professional-select');
    const $priceInfo = $('#service-price-info');
    const $calendarStep = $('#calendar-step');
    const $timeslotStep = $('#timeslot-step'); // Selecionando a etapa de horários

    // --- 2. LÓGICA INICIAL (SELEÇÃO DE SERVIÇO) ---
    $serviceSelect.on('change', function () {
        const $selectedOption = $(this).find('option:selected');
        
        if ($selectedOption.val()) {
            const price = parseFloat($selectedOption.data('price')).toFixed(2);
            const priceType = $selectedOption.data('price-type');

            let priceText = '';
            if (priceType === 'FIXO') {
                priceText = `Valor: R$ ${price.replace('.', ',')}`;
            } else if (priceType === 'A_PARTIR_DE') {
                priceText = `A partir de R$ ${price.replace('.', ',')}`;
            }
            $priceInfo.text(priceText);

            $professionalSelect.prop('disabled', false);
            $professionalSelect.find('option[disabled]').text('Selecione um profissional...');

            $calendarStep.slideDown(); // Efeito de deslizar para mostrar
        } else {
            $priceInfo.text('');
            $professionalSelect.prop('disabled', true);
            $professionalSelect.find('option[disabled]').text('Primeiro, escolha um serviço');
            $calendarStep.slideUp(); // Esconde com efeito
            $timeslotStep.slideUp(); // Esconde também os horários
        }
    });

    // --- 3. LÓGICA DO CALENDÁRIO DINÂMICO ---
    const $currentMonthYear = $('#current-month-year');
    const $calendarDays = $('#calendar-days');
    const $prevMonthBtn = $('#prev-month-btn');
    const $nextMonthBtn = $('#next-month-btn');

    // Usando a data atual como ponto de partida
    let currentDate = new Date(); // Data atual do sistema
    currentDate.setDate(1); // Focamos no primeiro dia do mês

    function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        // Mapeia o nome do mês em português
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        $currentMonthYear.text(`${monthNames[month]} ${year}`);

        $calendarDays.empty(); // Limpa os dias anteriores

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adiciona células vazias para os dias antes do início do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            $calendarDays.append('<div class="calendar-day empty"></div>');
        }

        // Adiciona os dias do mês
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDate = new Date(year, month, day);
            const $dayCell = $(`<div class="calendar-day">${day}</div>`);
            
            // Adiciona classe para o dia de hoje
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                $dayCell.addClass('today');
            }

            // Lógica de disponibilidade (por enquanto, todos disponíveis a partir de hoje)
            if (dayDate < today.setHours(0,0,0,0)) {
                $dayCell.addClass('unavailable');
            } else {
                // Aqui virá a lógica para verificar com o backend se o dia tem horários
                $dayCell.addClass('available'); 
                $dayCell.data('date', `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
            }

            $calendarDays.append($dayCell);
        }
    }

    $prevMonthBtn.on('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    $nextMonthBtn.on('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Evento de clique nos dias do calendário
    $calendarDays.on('click', '.calendar-day.available', function() {
        // Remove a seleção de qualquer outro dia
        $('.calendar-day.selected').removeClass('selected');
        // Adiciona a classe ao dia clicado
        $(this).addClass('selected');

        // Mostra a seção de horários
        const selectedDate = $(this).data('date');
        $('#selected-date-info').text(new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR'));
        $timeslotStep.slideDown();

        // **PRÓXIMO PASSO:** Aqui faremos a chamada ao backend (Java) para buscar os horários
        // para a `selectedDate` e preencher a div `#available-times`.
        $('#available-times').html('<p>Buscando horários...</p>'); // Feedback para o usuário
    });

    // Inicia o calendário quando a página carrega
    renderCalendar();
});