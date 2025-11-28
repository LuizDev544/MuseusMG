console.log("Editar.js carregado com sucesso");

class EditarMuseuManager {
    constructor() {
        console.log("Inicializando EditarMuseuManager...");
        this.init();
    }

    init() {
        console.log("Editor de museus inicializado");
        this.configurarFormulario();
        this.definirFuncoesGlobais();
    }

    definirFuncoesGlobais() {
        window.abrirEdicao = (id) => {
            console.log(`🔘 abrirEdicao chamado para ID: ${id}`);
            this.abrirEdicao(id);
        };

        window.fecharFormulario = () => {
            console.log("🔘 fecharFormulario chamado");
            this.fecharFormulario();
        };

        console.log("🌍 Funções globais definidas");
    }

    async abrirEdicao(id) {
        try {
            console.log(`Abrindo edição do museu ID: ${id}`);

            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await fetch(`http://localhost:8080/api/admin/museus/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao carregar museu`);
            }

            const museu = await response.json();

            console.log("📦 Dados do museu recebidos:", museu);

            this.preencherFormulario(museu);
            this.mostrarFormulario();

        } catch (error) {
            console.error('❌ Erro ao carregar museu para edição:', error);
            alert('Erro ao carregar dados do museu: ' + error.message);
        }
    }

    preencherFormulario(museu) {
        try {
            console.log("🔍 Preenchendo formulário com dados:", museu);

            document.getElementById("inputId").value = museu.id;
            document.getElementById("inputNome").value = museu.museu || '';
            document.getElementById("inputDescricao").value = museu.descricaomuseu || '';
            document.getElementById("InputEntrada").value = museu.horarioabrir || '';
            document.getElementById("inputSaida").value = museu.horariosair || '';
            document.getElementById("inputTema").value = museu.tema || '';
            document.getElementById("inputCapacidade").value = museu.capacidade || '';
            document.getElementById("inputFundacao").value = museu.fundacao || '';
            document.getElementById("inputEndereco").value = museu.endereco || '';
            document.getElementById("inputPreco").value = museu.preco || '';

            console.log("✅ Formulário preenchido com sucesso");

        } catch (error) {
            console.error('❌ Erro ao preencher formulário:', error);
        }
    }

    mostrarFormulario() {
        const form = document.getElementById("formEdicao");
        const overlay = document.getElementById("overlay");

        console.log("🔍 Mostrar formulário - Elementos:", {
            form: !!form,
            overlay: !!overlay
        });

        if (form && overlay) {
            form.style.display = 'block';
            overlay.style.display = 'block';
            console.log("📋 Formulário ABERTO");
        } else {
            console.error("❌ Formulário ou overlay não encontrado");
        }
    }

    fecharFormulario() {
        const form = document.getElementById("formEdicao");
        const overlay = document.getElementById("overlay");

        if (form && overlay) {
            form.style.display = 'none';
            overlay.style.display = 'none';
            console.log("📋 Formulário FECHADO");
        }
    }

    configurarFormulario() {
        const form = document.getElementById("formEdicao");
        if (form) {
            form.addEventListener("submit", (e) => this.salvarEdicao(e));
            console.log("✅ Formulário de edição configurado");
        } else {
            console.error("❌ Formulário de edição não encontrado");
        }
    }

    async salvarEdicao(event) {
        event.preventDefault();
        console.log("💾 Iniciando salvamento...");

        try {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            console.log("📤 Dados para salvar:", data);

            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`http://localhost:8080/api/admin/museus/${data.id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Erro detalhado:", errorText);
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const resultado = await response.json();
            console.log("✅ Museu atualizado:", resultado);

            alert("Museu atualizado com sucesso!");
            this.fecharFormulario();

            // Recarregar a lista
            if (window.listarMuseu && window.listarMuseu.carregarMuseus) {
                await window.listarMuseu.carregarMuseus();
            } else {
                location.reload();
            }

        } catch (error) {
            console.error('❌ Erro ao atualizar museu:', error);
            alert("Erro ao atualizar museu: " + error.message);
        }
    }
}

console.log("🚀 Criando EditarMuseuManager...");
window.editarMuseuManager = new EditarMuseuManager();