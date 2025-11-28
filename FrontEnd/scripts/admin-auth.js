class AdminAuth {
    constructor() {
        this.init();
    }

    init() {
        console.log(" Inicializando sistema de login admin...");
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const togglePassword = document.getElementById('togglePassword');
        if (togglePassword) {
            togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }
    }

    async checkExistingSession() {
        console.log("Verificando sessão existente...");

        if (!SecurityConfig.isAuthenticated()) {
            console.log("ℹNenhuma sessão anterior encontrada");
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(SecurityConfig.AUTH_ENDPOINTS.VALIDATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (data.valid && data.role === 'ROLE_ADMIN') {
                console.log("✅ Sessão válida encontrada! Redirecionando...");
                this.redirectToPanel();
            } else {
                console.log("❌ Sessão expirada ou inválida");
                SecurityConfig.clearAuthData();
            }

        } catch (error) {
            console.error("💥 Erro ao verificar sessão:", error);
            SecurityConfig.clearAuthData();
        }
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const icon = document.querySelector('#togglePassword i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    async handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            this.showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        const button = document.querySelector('.auth-btn');
        const buttonText = button.querySelector('.btn-text');
        const buttonLoader = button.querySelector('.btn-loader');

        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        button.disabled = true;

        try {
            const response = await fetch(SecurityConfig.AUTH_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: password
                })
            });

            const data = await response.json();

            if (response.status === 200 && data.authenticated && data.role === 'ROLE_ADMIN') {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userData', JSON.stringify({
                    email: data.usuario,
                    role: data.role
                }));

                this.showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                this.redirectToPanel();

            } else {
                const errorMessage = data.message || 'Erro no login';
                this.showMessage(errorMessage, 'error');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            this.showMessage('Erro de conexão. Verifique se o servidor está rodando.', 'error');
        } finally {
            // Restaurar botão
            buttonText.style.display = 'block';
            buttonLoader.style.display = 'none';
            button.disabled = false;
        }
    }

    redirectToPanel() {
        setTimeout(() => {
            window.location.href = 'PainelADM.html';
        }, 1000);
    }

    showMessage(message, type) {
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message auth-message-${type}`;
        messageDiv.textContent = message;

        const authForm = document.querySelector('.auth-form');
        if (authForm && authForm.parentNode) {
            authForm.parentNode.insertBefore(messageDiv, authForm);
        }

        if (type !== 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AdminAuth();
});