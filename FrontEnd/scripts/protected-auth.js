// FrontEnd/scripts/auth/protected-auth.js
console.log("🛡️ ProtectedAuth carregando...");

if (typeof ProtectedAuth === 'undefined') {
    class ProtectedAuth {
        constructor() {
            this.verificationInProgress = false;
        }

        async init() {
            console.log("🛡️ Inicializando proteção de página...");
            
            // Pequeno delay para garantir que tudo está carregado
            setTimeout(async () => {
                await this.verifyAuthentication();
                this.setupLogout();
            }, 100);
        }

        async verifyAuthentication() {
            if (this.verificationInProgress) {
                console.log("⏳ Verificação já em andamento...");
                return;
            }

            this.verificationInProgress = true;

            try {
                const token = localStorage.getItem('jwtToken');
                const userData = localStorage.getItem('userData');

                console.log("🔍 Verificando autenticação...", {
                    token: !!token,
                    userData: !!userData
                });

                // Verificação básica
                if (!token || !userData) {
                    console.log("🚫 Token ou userData não encontrados");
                    this.redirectToLogin();
                    return;
                }

                // Verificar se é admin
                const parsedUserData = JSON.parse(userData);
                if (parsedUserData.role !== 'ROLE_ADMIN') {
                    console.log("🚫 Usuário não é admin");
                    this.redirectToLogin();
                    return;
                }

                // Validar token no servidor
                console.log("🔄 Validando token no servidor...");
                const response = await fetch('http://localhost:8080/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: token })
                });

                if (!response.ok) {
                    throw new Error('Erro na validação do token');
                }

                const data = await response.json();
                console.log("📋 Resposta da validação:", data);

                if (!data.valid || data.role !== 'ROLE_ADMIN') {
                    throw new Error('Token inválido ou não é administrador');
                }

                console.log("✅ Autenticação válida - Acesso permitido");
                this.onAuthenticationSuccess(data.usuario);
                
            } catch (error) {
                console.error('❌ Erro na verificação:', error);
                this.redirectToLogin();
            } finally {
                this.verificationInProgress = false;
            }
        }

        onAuthenticationSuccess(username) {
            console.log(`🎉 ${username} autenticado com sucesso`);
            // Esta função será sobrescrita pelas páginas específicas
        }

        setupLogout() {
            // Configurar botões de logout
            const logoutButtons = document.querySelectorAll('[data-logout="true"]');
            logoutButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            });

            // Manter compatibilidade com onclick="logout()"
            window.logout = () => this.logout();
        }

        logout() {
            console.log("🚪 Fazendo logout...");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = 'login-admin.html';
        }

        redirectToLogin() {
            console.log("🔄 Redirecionando para login...");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userData');
            window.location.href = 'login-admin.html';
        }
    }

    // Tornar global
    window.ProtectedAuth = ProtectedAuth;
} else {
    console.log("ℹ️ ProtectedAuth já foi carregado anteriormente");
}