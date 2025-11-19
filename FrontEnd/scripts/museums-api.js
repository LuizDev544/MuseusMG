// museums-api.js - Sistema para buscar museus do banco de dados Spring Boot

class MuseumsAPI {
    constructor() {
        this.baseURL = 'http://localhost:8080/api'; // URL do seu backend Spring
        this.museums = [];
    }

    // Buscar todos os museus do banco de dados (endpoint público)
    async fetchMuseums() {
        try {
            console.log('Buscando museus do backend...');
            
            const response = await fetch(`${this.baseURL}/public/museus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
            }

            this.museums = await response.json();
            console.log('Museus carregados:', this.museums);
            return this.museums;

        } catch (error) {
            console.error('Erro ao buscar museus:', error);
            
            // Fallback: dados mock para demonstração (remova em produção)
            console.warn('Usando dados mock devido ao erro de conexão');
            return this.getMockMuseums();
        }
    }

    // Dados mock para demonstração (usar apenas em desenvolvimento)
    getMockMuseums() {
        return [
            {
                id: 1,
                museu: "Museu de Arte de São Paulo",
                descricaomuseu: "Um dos mais importantes museus de arte do Brasil, com acervo diversificado de obras nacionais e internacionais.",
                horarioabrir: "10:00",
                horariosair: "18:00",
                tema: "Arte",
                capacidade: 500,
                fundacao: "1947",
                endereco: "Av. Paulista, 1578 - São Paulo",
                preco: 50.00
            },
            {
                id: 2,
                museu: "Museu do Ipiranga",
                descricaomuseu: "Museu histórico dedicado à independência do Brasil, com acervo de objetos e documentos do período imperial.",
                horarioabrir: "09:00",
                horariosair: "17:00",
                tema: "História",
                capacidade: 300,
                fundacao: "1895",
                endereco: "Parque da Independência, s/n - São Paulo",
                preco: 20.00
            },
            {
                id: 3,
                museu: "Museu da Imigração",
                descricaomuseu: "Preserva a história da imigração no estado de São Paulo, com foco nas diversas culturas que formaram o Brasil.",
                horarioabrir: "09:00",
                horariosair: "17:00",
                tema: "História Cultural",
                capacidade: 200,
                fundacao: "1998",
                endereco: "R. Visc. de Parnaíba, 1316 - São Paulo",
                preco: 10.00
            }
        ];
    }

    // Buscar museu específico por ID (endpoint público)
    async getMuseumById(id) {
        try {
            console.log(`Buscando museu ID: ${id}`);
            
            const response = await fetch(`${this.baseURL}/public/museus/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Museu não encontrado');
                }
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const museum = await response.json();
            console.log('Museu encontrado:', museum);
            return museum;

        } catch (error) {
            console.error('Erro ao buscar museu:', error);
            // Fallback para dados mock
            return this.getMockMuseums().find(museum => museum.id === id);
        }
    }

    // ADMIN: Criar novo museu
    async createMuseum(museumData) {
        try {
            const token = this.getAuthToken(); // Implementar sistema de autenticação
            const response = await fetch(`${this.baseURL}/admin/museus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(museumData)
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar museu: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar museu:', error);
            throw error;
        }
    }

    // ADMIN: Atualizar museu
    async updateMuseum(id, museumData) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.baseURL}/admin/museus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(museumData)
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar museu: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar museu:', error);
            throw error;
        }
    }

    // ADMIN: Deletar museu
    async deleteMuseum(id) {
        try {
            const token = this.getAuthToken();
            const response = await fetch(`${this.baseURL}/admin/museus/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao deletar museu: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Erro ao deletar museu:', error);
            throw error;
        }
    }

    getMuseumImage(museum) {
        const imageMap = {
            'AfroBrasil': '../FrontEnd/Imagens/AfroBrasil.jpg',
            'Catavento': '../FrontEnd/Imagens/Catavento.webp',
            'MuseuArteSP': '../FrontEnd/Imagens/MuseuArteSP.webp',
            'MuseuDaImigracao': '../FrontEnd/Imagens/MuseuDaImigracao.jpg',
            'MuseuDaLinguaPortuguesa': '../FrontEnd/Imagens/MuseuDaLinguaPortuguesa.jpg',
            'MuseuDoCafe': '../FrontEnd/Imagens/MuseuDoCafe.jpg',
            'MuseuDoFutebol': '../FrontEnd/Imagens/MuseuDoFutebol.webp',
            'MuseuDoIpiranga': '../FrontEnd/Imagens/MuseuDoIpiranga.webp'
        };

        return imageMap[museum.tema] || '../FrontEnd/Imagens/MuseuDaArteContemporanea.jpg';
    }

    // Gerar badge baseado no tema
    getMuseumBadge(museum) {
        const badgeMap = {
            'Arte': 'Arte',
            'História': 'Histórico',
            'História Cultural': 'Cultural',
            'Arte Brasileira': 'Arte Nacional',
            'Cultura Afro-Brasileira': 'Cultural',
            'Ciência e Tecnologia': 'Interativo',
            'Cultural': 'Cultural'
        };

        return badgeMap[museum.tema] || 'Em Destaque';
    }

    // Formatar horário
    formatSchedule(open, close) {
        if (!open || !close) return 'Horário não informado';
        return `${open} às ${close}`;
    }

    // Formatar preço
    formatPrice(price) {
        if (!price && price !== 0) return 'Gratuito';
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    // Validar dados do museu
    validateMuseumData(museum) {
        const requiredFields = ['museu', 'descricaomuseu', 'tema'];
        const missingFields = requiredFields.filter(field => !museum[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
        }

        if (museum.capacidade && museum.capacidade < 0) {
            throw new Error('Capacidade não pode ser negativa');
        }

        if (museum.preco && museum.preco < 0) {
            throw new Error('Preço não pode ser negativo');
        }

        return true;
    }

    // Criar card HTML para um museu
    createMuseumCard(museum) {
        // Validar dados básicos
        if (!museum || !museum.museu) {
            console.error('Dados do museu inválidos:', museum);
            return '';
        }

        const imageUrl = this.getMuseumImage(museum);
        const badge = this.getMuseumBadge(museum);
        const schedule = this.formatSchedule(museum.horarioabrir, museum.horariosair);
        const price = this.formatPrice(museum.preco);

        return `
            <div class="museum-card fade-in" data-id="${museum.id}">
                <div class="card-badge">${badge}</div>
                <div class="img" style="background-image: url('${imageUrl}');" 
                     onerror="this.style.backgroundImage='url(../FrontEnd/Imagens/MuseuDaArteContemporanea.jpg)'"></div>
                <div class="info">
                    <h3>${this.escapeHtml(museum.museu)}</h3>
                    <div class="museum-meta">
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${schedule}</span>
                        </div>
                        ${museum.capacidade ? `
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>Capacidade: ${museum.capacidade} pessoas</span>
                        </div>
                        ` : ''}
                        ${museum.fundacao ? `
                        <div class="meta-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Fundado em ${museum.fundacao}</span>
                        </div>
                        ` : ''}
                        ${museum.endereco ? `
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span title="${this.escapeHtml(museum.endereco)}">
                                ${this.truncateText(museum.endereco, 30)}
                            </span>
                        </div>
                        ` : ''}
                    </div>
                    <p>${this.escapeHtml(museum.descricaomuseu || 'Descrição não disponível.')}</p>
                    <div class="card-footer">
                        <span class="price">${price}</span>
                        <button class="btn-details" onclick="showMuseumDetails(${museum.id})">
                            <i class="fas fa-info-circle"></i>
                            Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Utilitário para escapar HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Utilitário para truncar texto
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Renderizar todos os cards
    async renderMuseums() {
        const grid = document.getElementById('museumsGrid');
        
        if (!grid) {
            console.error('Elemento museumsGrid não encontrado');
            return;
        }

        // Mostrar loading
        grid.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando museus...</p>
            </div>
        `;

        try {
            const museums = await this.fetchMuseums();
            
            if (!museums || museums.length === 0) {
                grid.innerHTML = `
                    <div class="no-museums">
                        <i class="fas fa-landmark"></i>
                        <h3>Nenhum museu encontrado</h3>
                        <p>Não há museus cadastrados no momento.</p>
                    </div>
                `;
                return;
            }

            // Gerar cards
            const cardsHTML = museums.map(museum => this.createMuseumCard(museum)).join('');
            grid.innerHTML = cardsHTML;

            // Adicionar animação de fade-in
            setTimeout(() => {
                const cards = document.querySelectorAll('.museum-card');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            }, 100);

        } catch (error) {
            console.error('Erro ao renderizar museus:', error);
            grid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erro ao carregar museus</h3>
                    <p>${error.message}</p>
                    <button onclick="museumsAPI.renderMuseums()" class="retry-btn">
                        <i class="fas fa-redo"></i>
                        Tentar Novamente
                    </button>
                </div>
            `;
        }
    }

    // Obter token de autenticação (implementar conforme seu sistema de auth)
    getAuthToken() {
        // Implemente conforme seu sistema de autenticação
        // Exemplo: return localStorage.getItem('authToken');
        return 'seu-token-aqui';
    }
}

// Instância global da API
const museumsAPI = new MuseumsAPI();

// Função para mostrar detalhes do museu
async function showMuseumDetails(museumId) {
    try {
        const museum = await museumsAPI.getMuseumById(museumId);
        
        if (!museum) {
            throw new Error('Museu não encontrado');
        }

        // Criar modal de detalhes
        const modal = document.createElement('div');
        modal.className = 'museum-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-header">
                    <h2>${museumsAPI.escapeHtml(museum.museu)}</h2>
                    <span class="modal-badge">${museumsAPI.getMuseumBadge(museum)}</span>
                </div>
                <div class="modal-body">
                    <div class="modal-image" 
                         style="background-image: url('${museumsAPI.getMuseumImage(museum)}')"
                         onerror="this.style.backgroundImage='url(../FrontEnd/Imagens/MuseuDaArteContemporanea.jpg)'">
                    </div>
                    <div class="modal-info">
                        <div class="info-grid">
                            <div class="info-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Horário:</strong>
                                    <span>${museumsAPI.formatSchedule(museum.horarioabrir, museum.horariosair)}</span>
                                </div>
                            </div>
                            ${museum.capacidade ? `
                            <div class="info-item">
                                <i class="fas fa-users"></i>
                                <div>
                                    <strong>Capacidade:</strong>
                                    <span>${museum.capacidade} pessoas</span>
                                </div>
                            </div>
                            ` : ''}
                            ${museum.fundacao ? `
                            <div class="info-item">
                                <i class="fas fa-calendar-alt"></i>
                                <div>
                                    <strong>Fundação:</strong>
                                    <span>${museum.fundacao}</span>
                                </div>
                            </div>
                            ` : ''}
                            ${museum.endereco ? `
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Endereço:</strong>
                                    <span>${museumsAPI.escapeHtml(museum.endereco)}</span>
                                </div>
                            </div>
                            ` : ''}
                            ${museum.tema ? `
                            <div class="info-item">
                                <i class="fas fa-tag"></i>
                                <div>
                                    <strong>Tema:</strong>
                                    <span>${museum.tema}</span>
                                </div>
                            </div>
                            ` : ''}
                            <div class="info-item">
                                <i class="fas fa-ticket-alt"></i>
                                <div>
                                    <strong>Ingresso:</strong>
                                    <span class="price">${museumsAPI.formatPrice(museum.preco)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-description">
                            <h4>Descrição</h4>
                            <p>${museumsAPI.escapeHtml(museum.descricaomuseu || 'Descrição não disponível.')}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="reserveTicket(${museum.id})">
                        <i class="fas fa-ticket-alt"></i>
                        Reservar Ingresso
                    </button>
                    <button class="btn-secondary" onclick="shareMuseum(${museum.id})">
                        <i class="fas fa-share"></i>
                        Compartilhar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Fechar modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => modal.remove();

        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        // Fechar com ESC
        const closeHandler = (e) => {
            if (e.key === 'Escape') modal.remove();
        };
        document.addEventListener('keydown', closeHandler);
        
        // Remover listener quando modal fechar
        modal.addEventListener('remove', () => {
            document.removeEventListener('keydown', closeHandler);
        });

    } catch (error) {
        console.error('Erro ao carregar detalhes do museu:', error);
        alert('Erro ao carregar detalhes do museu: ' + error.message);
    }
}

// Funções auxiliares
function reserveTicket(museumId) {
    alert(`Redirecionando para reserva do museu ID: ${museumId}`);
    // Implementar lógica de reserva
}

function shareMuseum(museumId) {
    if (navigator.share) {
        navigator.share({
            title: 'Conheça este museu incrível!',
            text: 'Descubra mais sobre a cultura e história neste museu.',
            url: window.location.href + `#museu-${museumId}`
        });
    } else {
        // Fallback para copiar link
        navigator.clipboard.writeText(window.location.href + `#museu-${museumId}`);
        alert('Link copiado para a área de transferência!');
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    museumsAPI.renderMuseums();
});

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MuseumsAPI, museumsAPI };
}