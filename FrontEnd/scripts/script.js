window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.navbar nav');

mobileMenuBtn.addEventListener('click', function () {
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.padding = '20px';
        nav.style.boxShadow = 'var(--shadow)';
        nav.style.gap = '15px';
        nav.style.alignItems = 'flex-start';
    }
});

let currentSlide = 1;
const totalSlides = 3;

let carouselInterval = setInterval(function () {
    document.getElementById(`slide${currentSlide}`).checked = false;
    currentSlide = currentSlide % totalSlides + 1;
    document.getElementById(`slide${currentSlide}`).checked = true;
}, 5000);

const carousel = document.querySelector('.carousel');

carousel.addEventListener('mouseenter', function () {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', function () {
    carouselInterval = setInterval(function () {
        document.getElementById(`slide${currentSlide}`).checked = false;
        currentSlide = currentSlide % totalSlides + 1;
        document.getElementById(`slide${currentSlide}`).checked = true;
    }, 5000);
});

const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = function () {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll();

const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Subscribed!';
        submitBtn.style.background = 'var(--success)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
        }, 2000);
    }, 1000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function obterImagemPorTema(tema) {
    const imagens = {
        "show": "imagens/show.jpg",
        "palestra": "imagens/palestra.jpg",
        "workshop": "imagens/workshop.jpg",
        "teatro": "imagens/teatro.jpg",
        "esportivo": "imagens/esportivo.jpg",
        "cultural": "imagens/cultural.jpg",
        "musical": "imagens/musical.jpg",
        "academico": "imagens/academico.jpg",
        "festival": "imagens/festival.webp",
        "feira": "imagens/feira.jpg"
    };

    if (!tema) return "imagens/confuso.webp";

    const temaLower = tema.toLowerCase();

    for (const key in imagens) {
        if (temaLower.includes(key)) {
            return imagens[key];
        }
    }

    return "imagens/freedy.png";
}

function aplicarImagemNosCards() {
    const cards = document.querySelectorAll('.museum-card');

    cards.forEach(card => {
        const tema = card.querySelector('.card-badge').textContent;
        const img = card.querySelector('.card-img');
        img.src = obterImagemPorTema(tema);
    });
}

function filterMuseumsByTheme(theme) {
    const cards = document.querySelectorAll('.museum-card');

    cards.forEach(card => {
        const cardTheme = card.querySelector('.card-badge').textContent.toLowerCase();
        card.style.display = (theme === 'all' || cardTheme.includes(theme.toLowerCase())) ? 'block' : 'none';
    });
}

function addFilterButtons() {
    const sectionTitle = document.querySelector('.section-title');

    const filterHTML = `
        <div class="museum-filters">
            <button class="filter-btn active" data-filter="all">Todos</button>
            <button class="filter-btn" data-filter="arte">Arte</button>
            <button class="filter-btn" data-filter="histórico">Histórico</button>
            <button class="filter-btn" data-filter="cultural">Cultural</button>
            <button class="filter-btn" data-filter="interativo">Interativo</button>
        </div>
    `;

    sectionTitle.insertAdjacentHTML('afterend', filterHTML);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMuseumsByTheme(this.dataset.filter);
        });
    });
}

function searchMuseums() {
    const searchInput = document.querySelector('.museums input[type="search"]');
    const cards = document.querySelectorAll('.museum-card');
    const searchTerm = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const museumName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = museumName.includes(searchTerm) ? 'block' : 'none';
    });
}

const searchForm = document.querySelector('.museums form');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    searchMuseums();
});

document.querySelector('.museums input[type="search"]').addEventListener('input', searchMuseums);

document.addEventListener('DOMContentLoaded', aplicarImagemNosCards);
