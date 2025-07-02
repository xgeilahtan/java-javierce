<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List, java.util.ArrayList" %> 
<%@ page import="com.seusite.model.AgendamentoModel, com.seusite.model.ClienteModel" %> <%-- Altere para o caminho real dos seus Models --%>
<%@ page import="com.seusite.dao.AgendamentoDAO, com.seusite.dao.ClienteDAO" %> <%-- Altere para o caminho real dos seus DAOs --%>

<%
    // --- VERIFICAÇÃO DE SESSÃO ---
    String nomeUsuario = (String) session.getAttribute("nome");
    Integer clienteId = (Integer) session.getAttribute("clienteId"); // Supondo que você guarda o ID do cliente na sessão

    if (nomeUsuario == null || clienteId == null) {
        response.sendRedirect("../index.jsp"); // Ou para a página de login
        return;
    }

    // --- BUSCA DE DADOS (Simulação) ---
    // Em um cenário real, você faria a chamada ao seu DAO aqui
    AgendamentoDAO agendamentoDAO = new AgendamentoDAO();
    ClienteDAO clienteDAO = new ClienteDAO();

    // Lista de agendamentos do cliente
    List<AgendamentoModel> agendamentos = agendamentoDAO.listarPorCliente(clienteId);

    // Dados do perfil do cliente
    ClienteModel perfil = clienteDAO.buscarPorId(clienteId);
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Área do Cliente - Javier Cabelo e Estética</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../css/styles.css"> 
</head>
<body class="hold-transition layout-top-nav">
    <div class="wrapper">
        <nav class="main-header navbar navbar-expand navbar-light navbar-white">
            <div class="container">
                <a href="../index.jsp" class="navbar-brand mr-auto">
                    <img src="../img/Logo 2.2.png" alt="Javier Cabelo & Estética" class="brand-image img-fluid">
                    <span class="brand-text font-weight-light">Javier</span>
                </a>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a href="../index.jsp" class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="agendamento.jsp" class="nav-link">Agendamento</a></li>
                    <li class="nav-item"><a href="local.jsp" class="nav-link">Local</a></li>
                </ul>
                </div>
        </nav>

        <div class="content-wrapper">
            <div class="container">
                <div class="pt-4 pb-2 d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Olá, <%= nomeUsuario %>!</h1>
                        <p class="lead">Gerencie seus agendamentos e seu perfil em um só lugar.</p>
                    </div>
                    <div>
                        <a href="../LoginController?acao=logout" class="btn btn-danger"><i class="fas fa-sign-out-alt"></i> Sair</a>
                    </div>
                </div>

                <div class="card card-primary card-outline card-tabs">
                    <div class="card-header p-0 pt-1 border-bottom-0">
                        <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="tab-agendamentos-link" data-toggle="pill" href="#tab-agendamentos" role="tab" aria-controls="tab-agendamentos" aria-selected="true">
                                    <i class="fas fa-calendar-check"></i> Meus Agendamentos
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="tab-perfil-link" data-toggle="pill" href="#tab-perfil" role="tab" aria-controls="tab-perfil" aria-selected="false">
                                    <i class="fas fa-user-edit"></i> Meu Perfil
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-four-tabContent">
                            
                            <div class="tab-pane fade show active" id="tab-agendamentos" role="tabpanel" aria-labelledby="tab-agendamentos-link">
                                <form id="form-cancelar-agendamento" action="../AgendamentoController" method="POST">
                                    <input type="hidden" name="acao" value="cancelarMultiplos">
                                    <div class="mb-3 d-flex justify-content-between align-items-center">
                                        <h4>Seus próximos agendamentos:</h4>
                                        <button type="submit" id="btn-cancelar" class="btn btn-warning" disabled>
                                            <i class="fas fa-calendar-times"></i> Cancelar Selecionados
                                        </button>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th style="width: 10px;"><input type="checkbox" id="select-all-agendamentos"></th>
                                                    <th>Serviço</th>
                                                    <th>Profissional</th>
                                                    <th>Data</th>
                                                    <th>Horário</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <% if (agendamentos != null && !agendamentos.isEmpty()) { %>
                                                    <% for (AgendamentoModel ag : agendamentos) { %>
                                                        <tr>
                                                            <td><input type="checkbox" name="agendamentoIds" value="<%= ag.getId() %>" class="check-agendamento"></td>
                                                            <td><%= ag.getServicoNome() %></td>
                                                            <td><%= ag.getProfissionalNome() %></td>
                                                            <td><%= ag.getDataFormatada() %></td>
                                                            <td><%= ag.getHorario() %></td>
                                                            <td><span class="badge bg-success"><%= ag.getStatus() %></span></td>
                                                        </tr>
                                                    <% } %>
                                                <% } else { %>
                                                    <tr>
                                                        <td colspan="6" class="text-center">Você ainda não possui agendamentos.</td>
                                                    </tr>
                                                <% } %>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>

                            <div class="tab-pane fade" id="tab-perfil" role="tabpanel" aria-labelledby="tab-perfil-link">
                                <h4>Informações do Perfil</h4>
                                <form action="../ClienteController" method="POST">
                                    <input type="hidden" name="acao" value="atualizarPerfil">
                                    <input type="hidden" name="clienteId" value="<%= perfil.getId() %>">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="nome">Nome Completo</label>
                                                <input type="text" id="nome" name="nome" class="form-control" value="<%= perfil.getNome() %>" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="email">Email</label>
                                                <input type="email" id="email" name="email" class="form-control" value="<%= perfil.getEmail() %>" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="telefone">Telefone</label>
                                                <input type="text" id="telefone" name="telefone" class="form-control" value="<%= perfil.getTelefone() %>">
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <h5>Alterar Senha (opcional)</h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="novaSenha">Nova Senha</label>
                                                <input type="password" id="novaSenha" name="novaSenha" class="form-control" placeholder="Deixe em branco para não alterar">
                                            </div>
                                        </div>
                                         <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="confirmaSenha">Confirmar Nova Senha</label>
                                                <input type="password" id="confirmaSenha" name="confirmaSenha" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Salvar Alterações</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="main-footer text-white py-4">
             </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
    
    <script>
        $(document).ready(function() {
            // --- LÓGICA PARA A ABA DE AGENDAMENTOS ---
            const $btnCancelar = $('#btn-cancelar');
            const $selectAll = $('#select-all-agendamentos');
            const $checkboxes = $('.check-agendamento');

            function toggleCancelarButton() {
                // Habilita o botão de cancelar apenas se algum checkbox estiver marcado
                const anyChecked = $checkboxes.is(':checked');
                $btnCancelar.prop('disabled', !anyChecked);
            }

            // Ao clicar no checkbox " selecionar todos"
            $selectAll.on('click', function() {
                $checkboxes.prop('checked', this.checked);
                toggleCancelarButton();
            });

            // Ao clicar em um checkbox individual
            $checkboxes.on('click', function() {
                if (!$checkboxes.not(':checked').length) {
                    $selectAll.prop('checked', true);
                } else {
                    $selectAll.prop('checked', false);
                }
                toggleCancelarButton();
            });

            // Confirmação antes de cancelar
            $('#form-cancelar-agendamento').on('submit', function(e) {
                const confirmacao = confirm('Tem certeza que deseja cancelar os agendamentos selecionados? Esta ação não pode ser desfeita.');
                if (!confirmacao) {
                    e.preventDefault(); // Impede o envio do formulário se o usuário clicar em "Cancelar"
                }
            });
        });
    </script>
</body>
</html>