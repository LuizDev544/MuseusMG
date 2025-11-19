// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAuthForms();
    initializePasswordToggles();
    initializePasswordStrength();
});

// Initialize authentication forms
function initializeAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        initializePasswordConfirmation();
    }
}

// Password toggle functionality
function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password strength indicator
function initializePasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        const password = this.value;
        
        let strength = 0;
        let text = 'fraca';
        
        // Check password length
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Check for mixed case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        // Check for numbers and special characters
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Cap strength at 4
        strength = Math.min(strength, 4);
        
        // Update strength text
        switch(strength) {
            case 0:
            case 1:
                text = 'fraca';
                break;
            case 2:
                text = 'média';
                break;
            case 3:
                text = 'forte';
                break;
            case 4:
                text = 'muito forte';
                break;
        }
        
        // Update UI
        strengthBar.setAttribute('data-strength', strength - 1);
        strengthText.textContent = `Força da senha: ${text}`;
    });
}

// Password confirmation validation
function initializePasswordConfirmation() {
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('passwordMatchError');
    
    if (!passwordInput || !confirmInput || !errorMessage) return;
    
    function validatePasswordMatch() {
        if (confirmInput.value && passwordInput.value !== confirmInput.value) {
            errorMessage.style.display = 'block';
            confirmInput.style.borderColor = '#ef4444';
        } else {
            errorMessage.style.display = 'none';
            confirmInput.style.borderColor = confirmInput.value ? '#10b981' : 'var(--gray-light)';
        }
    }
    
    passwordInput.addEventListener('input', validatePasswordMatch);
    confirmInput.addEventListener('input', validatePasswordMatch);
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.auth-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    const formData = {
        email: form.email.value,
        password: form.password.value,
        rememberMe: form.rememberMe?.checked || false
    };
    
    // Validate form
    if (!formData.email || !formData.password) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateAPICall('login', formData);
        
        // Show success message
        showMessage('Login realizado com sucesso! Redirecionando...', 'success');
        
        // Redirect to admin panel (simulated)
        setTimeout(() => {
            window.location.href = 'PainelUsuario.html';
        }, 2000);
        
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        // Reset loading state
        btnText.style.opacity = '1';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Handle register form submission
async function handleRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.auth-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    const formData = {
        fullName: form.fullName.value,
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
        agreeTerms: form.agreeTerms.checked
    };
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!formData.agreeTerms) {
        showMessage('Você deve concordar com os termos de serviço.', 'error');
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showMessage('As senhas não coincidem.', 'error');
        return;
    }
    
    if (formData.password.length < 8) {
        showMessage('A senha deve ter pelo menos 8 caracteres.', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateAPICall('register', formData);
        
        // Show success message
        showMessage('Conta criada com sucesso! Redirecionando para login...', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login-admin.html';
        }, 2000);
        
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        // Reset loading state
        btnText.style.opacity = '1';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Simulate API call
function simulateAPICall(action, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful response
            if (Math.random() > 0.2) { // 80% success rate for demo
                resolve({
                    success: true,
                    message: `${action === 'login' ? 'Login' : 'Registro'} realizado com sucesso!`,
                    user: {
                        id: 1,
                        name: data.fullName || 'Admin User',
                        email: data.email,
                        role: 'admin'
                    }
                });
            } else {
                // Simulate error
                reject(new Error(
                    action === 'login' 
                    ? 'E-mail ou senha incorretos.' 
                    : 'Este e-mail já está em uso.'
                ));
            }
        }, 1500);
    });
}

// Show message to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = type === 'success' ? 'success-message' : 'error-message';
    messageEl.style.color = type === 'success' ? '' : '#ef4444';
    messageEl.style.background = type === 'success' ? '' : 'rgba(239, 68, 68, 0.1)';
    messageEl.textContent = message;
    
    // Insert message after the form
    const form = document.querySelector('.auth-form');
    form.appendChild(messageEl);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentElement) {
            messageEl.remove();
        }
    }, 5000);
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAuthForms,
        handleLogin,
        handleRegister,
        validateEmail,
        validatePassword
    };
}