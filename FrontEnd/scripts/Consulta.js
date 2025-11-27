document.addEventListener('DOMContentLoaded', function () {
    console.log("🔍 Consulta.js carregado - Inicializando...");
    
    // Inicializar feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Configurar ProtectedAuth
    if (typeof ProtectedAuth !== 'undefined') {
        const protectedAuth = new ProtectedAuth();
        protectedAuth.onAuthenticationSuccess = (username) => {
            console.log(`✅ Administrador ${username} autenticado - Painel de Consulta`);
        };
        protectedAuth.init();
    }

    // Configurar evento do formulário
    const form = document.getElementById('consultaForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            consultarMuseu();
        });
    }

    // Configurar evento Enter no campo de ID
    const idInput = document.getElementById('idmuseu');
    if (idInput) {
        idInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                consultarMuseu();
            }
        });
    }

    console.log("✅ Consulta.js inicializado com sucesso");
});

async function consultarMuseu() {
    const id = document.getElementById('idmuseu').value.trim();
    const btnConsultar = document.querySelector('.btn-consultar');

    console.log("🔎 Iniciando consulta para ID:", id);

    // Validação do ID
    if (!id || id < 1) {
        mostrarStatus("⚠️ Insira um ID válido (maior que 0).", "warning");
        return;
    }

    // Mostrar loading
    mostrarLoading(true);
    if (btnConsultar) {
        btnConsultar.disabled = true;
        btnConsultar.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Consultando...';
    }

    // Esconder resultado anterior
    document.getElementById('resultado').classList.add('d-none');

    try {
        const url = `http://localhost:8080/api/public/museus/${id}`;
        console.log("🌐 Endpoint usado:", url);

        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("📡 Status da resposta:", resposta.status);

        if (resposta.status === 200) {
            console.log("✅ Museu encontrado!");
            const museu = await resposta.json();
            
            mostrarMuseu(museu);
            mostrarStatus(`✅ Museu ID ${id} encontrado com sucesso!`, "success");
            
        } else if (resposta.status === 404) {
            console.log("❌ Museu não encontrado!");
            mostrarStatus(`❌ Museu com ID ${id} não encontrado. Verifique o ID informado.`, "error");
            limparCampos();
            
        } else {
            console.log("⚠️ Erro inesperado:", resposta.status);
            mostrarStatus(`❌ Erro ao buscar museu. Código: ${resposta.status}`, "error");
            limparCampos();
        }

    } catch (erro) {
        console.error("🔥 Erro de conexão:", erro);
        mostrarStatus("❌ Erro de conexão com o servidor. Verifique sua conexão e tente novamente.", "error");
        limparCampos();
    } finally {
        mostrarLoading(false);
        if (btnConsultar) {
            btnConsultar.disabled = false;
            btnConsultar.innerHTML = '<i data-feather="search"></i> Consultar Museu';
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }
}

function mostrarMuseu(museu) {
    console.log("📌 Preenchendo formulário com dados do museu:", museu);
    
    // Formatar dados antes de exibir
    const museuFormatado = {
        nome: museu.museu || 'Não informado',
        descricao: museu.descricaomuseu || 'Não informado',
        horarioAbrir: formatarHorario(museu.horarioabrir) || 'Não informado',
        horarioSair: formatarHorario(museu.horariosair) || 'Não informado',
        tema: museu.tema || 'Não informado',
        capacidade: museu.capacidade || '',
        fundacao: museu.fundacao || 'Não informado',
        endereco: museu.endereco || 'Não informado',
        preco: museu.preco !== null && museu.preco !== undefined ? museu.preco : 'Não informado'
    };

    // Preencher campos
    document.getElementById('txtnome').value = museuFormatado.nome;
    document.getElementById('txtdescricao').value = museuFormatado.descricao;
    document.getElementById('txtabrir').value = museuFormatado.horarioAbrir;
    document.getElementById('txtsair').value = museuFormatado.horarioSair;
    document.getElementById('txttema').value = museuFormatado.tema;
    document.getElementById('txtcapacidade').value = museuFormatado.capacidade;
    document.getElementById('txtfundacao').value = museuFormatado.fundacao;
    document.getElementById('txtendereco').value = museuFormatado.endereco;
    document.getElementById('txtpreco').value = museuFormatado.preco;

    // Mostrar resultado
    document.getElementById('resultado').classList.remove('d-none');
    
    console.log("✅ Formulário preenchido com sucesso!");
}

function formatarHorario(horario) {
    if (!horario) return '';
    
    // Se já estiver no formato HH:MM, retorna como está
    if (typeof horario === 'string' && horario.match(/^\d{2}:\d{2}$/)) {
        return horario;
    }
    
    // Tenta converter outros formatos de hora
    try {
        const data = new Date(horario);
        if (!isNaN(data.getTime())) {
            return data.toTimeString().slice(0, 5);
        }
    } catch (e) {
        console.warn("Não foi possível formatar o horário:", horario);
    }
    
    return horario;
}

function limparCampos() {
    console.log("🧹 Limpando campos...");

    const campos = [
        'txtnome', 'txtdescricao', 'txtabrir', 'txtsair', 
        'txttema', 'txtcapacidade', 'txtfundacao', 'txtendereco', 'txtpreco'
    ];

    campos.forEach(campo => {
        const element = document.getElementById(campo);
        if (element) {
            element.value = '';
        }
    });

    // Esconder resultado
    document.getElementById('resultado').classList.add('d-none');
}

function mostrarLoading(mostrar) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.classList.toggle('d-none', !mostrar);
    }
}

function mostrarStatus(mensagem, tipo = "info") {
    const statusElement = document.getElementById('statusMessage');
    if (!statusElement) return;

    // Resetar classes
    statusElement.className = 'alert d-none';
    
    // Adicionar classes baseadas no tipo
    switch (tipo) {
        case "success":
            statusElement.classList.add('alert-success');
            break;
        case "error":
            statusElement.classList.add('alert-danger');
            break;
        case "warning":
            statusElement.classList.add('alert-warning');
            break;
        default:
            statusElement.classList.add('alert-info');
    }

    statusElement.textContent = mensagem;
    statusElement.classList.remove('d-none');

    // Auto-esconder mensagens de sucesso após 5 segundos
    if (tipo === "success") {
        setTimeout(() => {
            statusElement.classList.add('d-none');
        }, 5000);
    }
}

// Manter compatibilidade com onclick (se necessário)
window.consultarMuseu = consultarMuseu;