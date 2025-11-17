// User Panel JavaScript

// Notification toggle
const notificationBtn = document.querySelector('.notification-btn');
notificationBtn.addEventListener('click', function() {
    // In a real app, this would open a notifications panel
    alert('You have 3 new notifications!');
});

// Active nav item highlighting
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // In a real app, this would load the corresponding section
        const sectionName = this.querySelector('span').textContent;
        console.log(`Loading ${sectionName} section...`);
    });
});

// Visit card interactions
const visitCards = document.querySelectorAll('.visit-card');
visitCards.forEach(card => {
    card.addEventListener('click', function() {
        const museumName = this.querySelector('h3').textContent;
        alert(`Viewing details for ${museumName}`);
    });
});

// Recommended card booking
const bookButtons = document.querySelectorAll('.recommended-card .btn');
bookButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.recommended-card');
        const museumName = card.querySelector('h3').textContent;
        
        // Simulate booking process
        const originalText = this.textContent;
        this.textContent = 'Booking...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = 'Booked!';
            this.style.background = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.background = '';
                alert(`Successfully booked tickets for ${museumName}!`);
            }, 1500);
        }, 1000);
    });
});

// Stats card animation on load
const statCards = document.querySelectorAll('.stat-card');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    statsObserver.observe(card);
});

// Search functionality (for future implementation)
const initSearch = () => {
    // This would be implemented when adding search functionality
    console.log('Search functionality ready to be implemented');
};

// Initialize user panel
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    
    // Simulate loading user data
    setTimeout(() => {
        console.log('User data loaded successfully');
    }, 500);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSearch,
        statsObserver
    };
}