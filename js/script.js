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
  document.querySelectorAll(".tab").forEach(link => {
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

// ========================================================
// === LÓGICA DO PAINEL DE CONTROLE DE USUÁRIOS (DASHBOARD) ===
// ========================================================
$(document).ready(function() {
    // Esta verificação garante que o código abaixo só rode na página de usuários
    if ($('#dashboard-container').length > 0) {

        // --- DADOS FICTÍCIOS (Mantidos e completos) ---
        const mockCliente = {
            nome: 'Ana Silva',
            email: 'ana.silva@email.com',
            telefone: '(11) 98765-4321',
            fotoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            agendamentos: [
                { id: 101, servico: 'Corte Feminino', profissional: 'Carlos', data: '2025-07-05', horario: '10:00', status: 'Confirmado' },
                { id: 102, servico: 'Manicure', profissional: 'Beatriz', data: '2025-07-10', horario: '14:00', status: 'Confirmado' },
                { id: 95, servico: 'Escova Progressiva', profissional: 'Carlos', data: '2025-06-15', horario: '11:00', status: 'Encerrado' }
            ]
        };

        const mockProfissional = {
            nome: 'Carlos Souza',
            email: 'carlos.souza@javier.com',
            telefone: '(11) 91234-5678',
            especialidades: 'Corte Masculino, Barba, Coloração',
            bio: 'Com mais de 10 anos de experiência, sou especialista em visagismo e nas últimas tendências de cortes masculinos.',
            fotoUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
            agenda: [
                 { id: 101, cliente: 'Ana Silva', servico: 'Corte Feminino', data: '2025-07-05', horario: '10:00', status: 'Confirmado' },
                 { id: 105, cliente: 'Marcos Lima', servico: 'Barba Terapia', data: '2025-07-05', horario: '11:30', status: 'Confirmado' }
            ]
        };
        
        const mockAdmin = {
            nome: 'Admin Javier',
            agendamentos: [...mockCliente.agendamentos, { id: 105, cliente: 'Marcos Lima', servico: 'Barba Terapia', profissional: 'Carlos', data: '2025-07-05', horario: '11:30', status: 'Confirmado' }],
            profissionais: [
                { id: 1, nome: 'Carlos Souza', email: 'carlos.souza@javier.com', especialidades: 'Cortes, Barba' },
                { id: 2, nome: 'Beatriz Lima', email: 'beatriz.lima@javier.com', especialidades: 'Manicure, Pedicure' }
            ],
            servicos: [
                { id: 1, nome: 'Corte Feminino', preco: '80.00', duracao: '60 min' },
                { id: 2, nome: 'Manicure', preco: '30.00', duracao: '45 min' }
            ],
             clientes: [
                { id: 1, nome: 'Ana Silva', email: 'ana.silva@email.com', telefone: '(11) 98765-4321'},
                { id: 2, nome: 'Marcos Lima', email: 'marcos.lima@email.com', telefone: '(11) 99999-8888'}
            ]
        };


        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!! TROQUE AQUI PARA TESTAR AS DIFERENTES VISÕES !!!
        const tipoUsuarioLogado = 'cliente'; // Mude para 'profissional' ou 'admin'
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        // **** FUNÇÃO RESTAURADA ****
        function inicializarDashboard(tipo) {
            let nomeUsuario = '';
            $('#dashboard-container').empty(); // Limpa o container

            switch (tipo) {
                case 'cliente':
                    nomeUsuario = mockCliente.nome;
                    renderClienteDashboard();
                    break;
                case 'profissional':
                    nomeUsuario = mockProfissional.nome;
                    renderProfissionalDashboard();
                    break;
                case 'admin':
                    nomeUsuario = mockAdmin.nome;
                    renderAdminDashboard();
                    break;
                default:
                    $('#dashboard-container').html('<p class="text-danger">Erro: Tipo de usuário desconhecido.</p>');
            }
            $('#welcome-message').text(`Olá, ${nomeUsuario}!`);
        }

        // --- FUNÇÕES DE RENDERIZAÇÃO ---
        function renderClienteDashboard() {
            const TABS_CLIENTE = `
                <div class="card card-primary card-outline card-tabs dashboard-card">
                    <div class="card-header p-0 pt-1 border-bottom-0">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item"><a class="active tab" data-toggle="pill" href="#cliente-agendamentos"><i class="fas fa-calendar-check"></i> Meus Agendamentos</a></li>
                            <li class="nav-item"><a class="tab" data-toggle="pill" href="#cliente-perfil"><i class="fas fa-user-edit"></i> Meu Perfil</a></li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="cliente-agendamentos">${gerarTabelaAgendamentos(mockCliente.agendamentos, 'cliente')}</div>
                            <div class="tab-pane fade" id="cliente-perfil">${gerarFormularioPerfil(mockCliente)}</div>
                        </div>
                    </div>
                </div>`;
            $('#dashboard-container').html(TABS_CLIENTE);
        }

        function renderProfissionalDashboard() {
            const TABS_PROFISSIONAL = `
                 <div class="card card-primary card-outline card-tabs dashboard-card">
                    <div class="card-header p-0 pt-1 border-bottom-0">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item"><a class="active tab" data-toggle="pill" href="#prof-agenda"><i class="fas fa-calendar-alt"></i> Minha Agenda</a></li>
                            <li class="nav-item"><a class="tab" data-toggle="pill" href="#prof-perfil"><i class="fas fa-user-tie"></i> Meu Perfil Profissional</a></li>
                        </ul>
                    </div>
                     <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="prof-agenda">${gerarTabelaAgendamentos(mockProfissional.agenda, 'profissional')}</div>
                            <div class="tab-pane fade" id="prof-perfil">${gerarFormularioPerfil(mockProfissional)}</div>
                        </div>
                    </div>
                </div>`;
            $('#dashboard-container').html(TABS_PROFISSIONAL);
        }

        function renderAdminDashboard() {
            const TABS_ADMIN = `
                <div class="card card-primary card-outline card-tabs dashboard-card">
                    <div class="card-header p-0 pt-1 border-bottom-0">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item"><a class="active tab" data-toggle="pill" href="#admin-agendamentos">Todos Agendamentos</a></li>
                            <li class="nav-item"><a class="tab" data-toggle="pill" href="#admin-profissionais">Profissionais</a></li>
                            <li class="nav-item"><a class="tab" data-toggle="pill" href="#admin-servicos">Serviços</a></li>
                            <li class="nav-item"><a class="tab" data-toggle="pill" href="#admin-clientes">Clientes</a></li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="admin-agendamentos">${gerarTabelaAgendamentos(mockAdmin.agendamentos, 'admin')}</div>
                            <div class="tab-pane fade" id="admin-profissionais">${gerarTabelaAdmin(mockAdmin.profissionais, 'profissionais')}</div>
                            <div class="tab-pane fade" id="admin-servicos">${gerarTabelaAdmin(mockAdmin.servicos, 'servicos')}</div>
                            <div class="tab-pane fade" id="admin-clientes">${gerarTabelaAdmin(mockAdmin.clientes, 'clientes')}</div>
                        </div>
                    </div>
                </div>`;
            $('#dashboard-container').html(TABS_ADMIN);
        }
        
        // --- FUNÇÕES GERADORAS DE HTML ---

        function gerarFormularioPerfil(dados) {
            const isProfissional = dados.especialidades !== undefined;
            let camposProfissionaisHtml = '';
            if (isProfissional) {
                camposProfissionaisHtml = `
                    <h3 class="form-section-title">Informações Profissionais</h3>
                    <div class="form-group">
                        <label for="especialidades">Especialidade(s)</label>
                        <input type="text" id="especialidades" class="form-control" value="${dados.especialidades || ''}">
                    </div>
                    <div class="form-group">
                        <label for="bio">Biografia Curta</label>
                        <textarea id="bio" class="form-control" rows="3" placeholder="Fale um pouco sobre você e seu trabalho.">${dados.bio || ''}</textarea>
                    </div>`;
            }

            return `
                <div class="profile-container" style="box-shadow: none; padding: 0; margin: 0; max-width: 100%;">
                    <div class="profile-header">
                        <img src="${dados.fotoUrl}" alt="Foto do Usuário" id="profile-avatar-preview" class="profile-avatar">
                        <div>
                            <label for="profile-avatar-input" class="profile-avatar-label"> <i class="fas fa-camera"></i> Alterar Foto </label>
                            <input type="file" id="profile-avatar-input" class="profile-avatar-input" accept="image/*">
                        </div>
                    </div>
                    <form id="perfil-form">
                        <h3 class="form-section-title">Informações Pessoais</h3>
                        <div class="row">
                            <div class="col-md-6 form-group"><label for="nome">Nome Completo</label><input type="text" id="nome" class="form-control" value="${dados.nome}" required></div>
                            <div class="col-md-6 form-group"><label for="email">Email</label><input type="email" id="email" class="form-control" value="${dados.email}" required></div>
                            <div class="col-md-6 form-group"><label for="telefone">Telefone</label><input type="tel" id="telefone" class="form-control" value="${dados.telefone}"></div>
                        </div>
                        ${camposProfissionaisHtml}
                        <h3 class="form-section-title">Alterar Senha</h3>
                        <div class="row">
                            <div class="col-md-6 form-group"><label for="nova-senha">Nova Senha</label><input type="password" id="nova-senha" class="form-control" placeholder="Deixe em branco para não alterar"></div>
                            <div class="col-md-6 form-group"><label for="confirmar-senha">Confirmar Nova Senha</label><input type="password" id="confirmar-senha" class="form-control"></div>
                        </div>
                        <div class="form-actions mt-4 text-right"><button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Salvar Alterações</button></div>
                    </form>
                </div>`;
        }
        
        // **** FUNÇÃO RESTAURADA ****
        function gerarTabelaAgendamentos(agendamentos, tipo) {
            let tableHeader = '';
            if (tipo === 'cliente') {
                tableHeader = '<th><input type="checkbox" id="select-all"></th><th>Serviço</th><th>Profissional</th><th>Data</th><th>Horário</th><th>Status</th>';
            } else if (tipo === 'profissional') {
                tableHeader = '<th>Cliente</th><th>Serviço</th><th>Data</th><th>Horário</th><th>Status</th>';
            } else { // admin
                 tableHeader = '<th>Cliente</th><th>Profissional</th><th>Serviço</th><th>Data</th><th>Status</th>';
            }

            let rows = agendamentos.map(ag => {
                if(tipo === 'cliente'){
                    return `<tr>
                        <td><input type="checkbox" class="check-agendamento" value="${ag.id}"></td>
                        <td>${ag.servico}</td>
                        <td>${ag.profissional}</td>
                        <td>${ag.data}</td>
                        <td>${ag.horario}</td>
                        <td><span class="badge ${ag.status === 'Confirmado' ? 'bg-success' : 'bg-secondary'}">${ag.status}</span></td>
                    </tr>`;
                } else if(tipo === 'profissional') {
                    return `<tr>
                        <td>${ag.cliente}</td>
                        <td>${ag.servico}</td>
                        <td>${ag.data}</td>
                        <td>${ag.horario}</td>
                        <td><span class="badge ${ag.status === 'Confirmado' ? 'bg-success' : 'bg-secondary'}">${ag.status}</span></td>
                    </tr>`;
                } else { // admin
                    return `<tr>
                        <td>${ag.cliente || 'N/A'}</td>
                        <td>${ag.profissional || 'N/A'}</td>
                        <td>${ag.servico}</td>
                        <td>${ag.data}</td>
                        <td><span class="badge ${ag.status === 'Confirmado' ? 'bg-success' : 'bg-secondary'}">${ag.status}</span></td>
                    </tr>`;
                }
            }).join('');
            
            const btnCancelar = tipo === 'cliente' ? `<div class="mb-3 text-right"><button id="btn-cancelar" class="btn btn-warning" disabled><i class="fas fa-calendar-times"></i> Cancelar Selecionados</button></div>` : '';
            
            return `
                ${btnCancelar}
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead><tr>${tableHeader}</tr></thead>
                        <tbody>${rows || '<tr><td colspan="6" class="text-center">Nenhum registro encontrado.</td></tr>'}</tbody>
                    </table>
                </div>`;
        }

        // **** FUNÇÃO RESTAURADA ****
        function gerarTabelaAdmin(dados, tipo) {
            let headers = [];
            if(tipo === 'profissionais') headers = ['Nome', 'Email', 'Especialidades'];
            if(tipo === 'servicos') headers = ['Nome', 'Preco', 'Duracao']; // Corrigido para corresponder ao mock data
            if(tipo === 'clientes') headers = ['Nome', 'Email', 'Telefone'];
            
            const tableHeader = headers.map(h => `<th>${h}</th>`).join('') + '<th>Ações</th>';

            const rows = dados.map(item => {
                let cells = headers.map(h => `<td>${item[h.toLowerCase()]}</td>`).join('');
                return `<tr>${cells}<td>
                    <button class="btn btn-sm btn-info btn-edit" data-id="${item.id}" data-type="${tipo}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}" data-type="${tipo}"><i class="fas fa-trash"></i></button>
                </td></tr>`;
            }).join('');
            
            const actionTitle = tipo.charAt(0).toUpperCase() + tipo.slice(1, -1); // Profissionais -> Profissional
            
            return `
                <div class="mb-3 text-right">
                    <button class="btn btn-success btn-add" data-type="${tipo}"><i class="fas fa-plus"></i> Adicionar Novo ${actionTitle}</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead><tr>${tableHeader}</tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>`;
        }
        
        // --- INICIALIZAÇÃO ---
        inicializarDashboard(tipoUsuarioLogado);
        
        // --- EVENT HANDLERS DINÂMICOS ---
        const dashboard = $('#dashboard-container');

        dashboard.on('change', '#select-all, .check-agendamento', function() {
            const isSelectAll = $(this).is('#select-all');
            const checked = this.checked;
            if (isSelectAll) {
                dashboard.find('.check-agendamento').prop('checked', checked);
            }
            const anyChecked = dashboard.find('.check-agendamento:checked').length > 0;
            $('#btn-cancelar').prop('disabled', !anyChecked);
        });

        dashboard.on('click', '.btn-add', function() {
            const tipo = $(this).data('type');
            if(tipo === 'profissionais') {
                $('#modal-profissional-title').text('Adicionar Novo Profissional');
                $('#form-profissional')[0].reset();
                $('#profissional-id').val(''); // Limpa o ID
                $('#modal-profissional').modal('show');
            }
        });
        
        dashboard.on('click', '.btn-edit', function() {
            const id = $(this).data('id');
            const tipo = $(this).data('type');
            if (tipo === 'profissionais') {
                const profissional = mockAdmin.profissionais.find(p => p.id === id);
                if (profissional) {
                    $('#modal-profissional-title').text('Editar Profissional');
                    $('#profissional-id').val(profissional.id);
                    $('#profissional-nome').val(profissional.nome);
                    $('#profissional-email').val(profissional.email);
                    $('#profissional-especialidades').val(profissional.especialidades);
                    $('#modal-profissional').modal('show');
                }
            }
        });

        $('#form-profissional').on('submit', function(e) {
            e.preventDefault();
            const id = $('#profissional-id').val();
            const data = {
                nome: $('#profissional-nome').val(),
                email: $('#profissional-email').val(),
                especialidades: $('#profissional-especialidades').val()
            };
            if (id) { console.log('Editando profissional', id, data); } 
            else { console.log('Adicionando novo profissional', data); }
            alert('Profissional salvo com sucesso! (Verifique o console)');
            $('#modal-profissional').modal('hide');
        });

        dashboard.on('change', '#profile-avatar-input', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) { $('#profile-avatar-preview').attr('src', e.target.result); }
                reader.readAsDataURL(file);
            }
        });

        dashboard.on('submit', '#perfil-form', function(event) {
            event.preventDefault();
            const novaSenha = $('#nova-senha').val();
            const confirmaSenha = $('#confirmar-senha').val();
            if (novaSenha !== confirmaSenha) {
                alert('Erro: As novas senhas não conferem!');
                return;
            }
            console.log("Formulário de perfil enviado!");
            alert('Perfil atualizado com sucesso!');
        });
    }
});