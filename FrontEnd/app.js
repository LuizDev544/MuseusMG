const exposicoes = [
{ titulo: "Arte Moderna Brasileira", local: "Museu de Arte SP", cidade: "São Paulo", categoria: "Arte", status: "Em Cartaz", img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92" },
{ titulo: "O Universo em Movimento", local: "Museu do Amanhã", cidade: "Rio de Janeiro", categoria: "Ciência", status: "Em Breve", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e" },
{ titulo: "História das Civilizações", local: "Museu Histórico", cidade: "Curitiba", categoria: "História", status: "Em Cartaz", img: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe" },
];


function renderCards(lista) {
const container = document.getElementById('exposicoes');
if (!container) return;
container.innerHTML = '';
lista.forEach(expo => {
container.innerHTML += `
<div class="card">
<img src="${expo.img}" alt="${expo.titulo}">
<div class="card-content">
<h3>${expo.titulo}</h3>
<p>${expo.local}</p>
<p>${expo.cidade} • ${expo.status}</p>
<button>Ver Detalhes</button>
</div>
</div>`;
});
}


function applyFilters() {
const categoria = document.getElementById('categoriaFilter').value;
const cidade = document.getElementById('cidadeFilter').value;
const status = document.getElementById('statusFilter').value;
let filtrados = exposicoes.filter(e =>
(!categoria || e.categoria === categoria) &&
(!cidade || e.cidade === cidade) &&
(!status || e.status === status)
);
renderCards(filtrados);
}


function search() {
const valor = document.getElementById('searchInput').value.toLowerCase();
const filtrados = exposicoes.filter(e => e.titulo.toLowerCase().includes(valor) || e.local.toLowerCase().includes(valor));
renderCards(filtrados);
}


function renderCarousel() {
const carrossel = document.getElementById('carousel');
if (!carrossel) return;
exposicoes.forEach(expo => {
carrossel.innerHTML += `
<div class="card" style="min-width: 250px">
<img src="${expo.img}" alt="${expo.titulo}">
<div class="card-content">
<h3>${expo.titulo}</h3>
<p>${expo.local}</p>
</div>
</div>`;
});
}


function login(event) {
event.preventDefault();
const email = document.getElementById('email').value;
const senha = document.getElementById('senha').value;


if (email === 'user@exemplo.com' && senha === 'senha123') {
alert('Login realizado com sucesso!');
window.location.href = 'index.html';
} else {
alert('Credenciais inválidas.');
}
}


document.addEventListener('DOMContentLoaded', () => {
renderCards(exposicoes);
renderCarousel();
});