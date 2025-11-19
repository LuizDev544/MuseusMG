// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.navbar nav');

mobileMenuBtn.addEventListener('click', function() {
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

// Auto-advance carousel
let currentSlide = 1;
const totalSlides = 3;

const carouselInterval = setInterval(function() {
    document.getElementById(`slide${currentSlide}`).checked = false;
    currentSlide = currentSlide % totalSlides + 1;
    document.getElementById(`slide${currentSlide}`).checked = true;
}, 5000);

// Pause carousel on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', function() {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', function() {
    carouselInterval = setInterval(function() {
        document.getElementById(`slide${currentSlide}`).checked = false;
        currentSlide = currentSlide % totalSlides + 1;
        document.getElementById(`slide${currentSlide}`).checked = true;
    }, 5000);
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = function() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll(); // Check on initial load

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Simulate form submission
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Adicionar esta função ao seu script.js existente

// Função para filtrar museus por tema
function filterMuseumsByTheme(theme) {
    const cards = document.querySelectorAll('.museum-card');
    
    cards.forEach(card => {
        const cardTheme = card.querySelector('.card-badge').textContent.toLowerCase();
        if (theme === 'all' || cardTheme.includes(theme.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Adicionar filtros se necessário
function addFilterButtons() {
    const museumsSection = document.querySelector('.museums');
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
    
    // Adicionar event listeners aos filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMuseumsByTheme(this.dataset.filter);
        });
    });
}
