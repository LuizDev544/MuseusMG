class ListarMuseu {
    constructor() {
        this.apiUrl = 'http://localhost:8080/api/admin/museus';
    }

    async init() {
        await this.carregarMuseus();
    }

    async carregarMuseus() {
        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                console.error('❌ Token JWT não encontrado');
                return;
            }

            console.log('🔐 Token sendo enviado:', token.substring(0, 20) + '...');

            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const museus = await response.json();
            this.exibirMuseus(museus);

        } catch (error) {
            console.error('❌ Erro ao buscar museus:', error);
            this.mostrarMensagem('Erro ao carregar museus: ' + error.message, 'error');
        }
    }

    exibirMuseus(museus) {
        const tbody = document.querySelector('#tabelaEventos tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        museus.forEach(museu => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${museu.id}</td>
                <td>${museu.museu || ''}</td>
                <td>${museu.descricaomuseu || ''}</td>
                <td>${museu.horarioabrir || ''}</td>
                <td>${museu.horariosair || ''}</td>
                <td>${museu.tema || ''}</td>
                <td>${museu.capacidade || ''}</td>
                <td>${museu.fundacao || ''}</td>
                <td>${museu.endereco || ''}</td>
                <td>${museu.preco || ''}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${museu.id}">
                        Editar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        this.configurarBotoesEditar();
        console.log(`✅ ${museus.length} museus exibidos na tabela`);
    }

    configurarBotoesEditar() {
        const botoes = document.querySelectorAll('.btn-editar');
        botoes.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                console.log(`🔘 Botão Editar clicado: ID ${id}`);

                if (typeof window.abrirEdicao === 'function') {
                    window.abrirEdicao(id);
                } else if (typeof window.editarMuseuManager !== 'undefined' && window.editarMuseuManager.abrirEdicao) {
                    window.editarMuseuManager.abrirEdicao(id);
                } else {
                    alert('Sistema de edição não carregado. Recarregue a página.');
                }
            });
        });

        console.log(`✅ ${botoes.length} botões de edição configurados`);
    }

    mostrarMensagem(mensagem, tipo) {
        console.log(`${tipo}: ${mensagem}`);
    }
}

let listarMuseu;

document.addEventListener('DOMContentLoaded', () => {
    listarMuseu = new ListarMuseu();
});