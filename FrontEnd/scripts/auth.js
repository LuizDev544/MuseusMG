class Auth {
    constructor() {
        this.verificationInProgress = false;
        this.verificationCount = 0;
        this.maxVerifications = 3; 
    }

    async verificarSessao() {
        if (this.verificationInProgress) {
            console.log("⚠️Verificação já em andamento, aguardando...");
            return;
        }

        this.verificationCount++;
        if (this.verificationCount > this.maxVerifications) {
            console.log("🛑Limite de verificações atingido, parando...");
            return;
        }

        this.verificationInProgress = true;

        try {
            const token = localStorage.getItem('jwtToken');
            const currentPage = window.location.pathname;
            
            console.log(`Verificação ${this.verificationCount} - Página: ${currentPage}, Token: ${token ? 'Encontrado' : 'Não encontrado'}`);

            if (currentPage.includes('login-admin.html') || currentPage.endsWith('/login-admin.html')) {
                if (token) {
                    console.log("Token encontrado na página de login, validando...");
                    const isValid = await this.validarToken(token);
                    if (isValid) {
                        console.log("✅ Token válido! Redirecionando para painel...");
                        window.location.href = "PainelADM.html";
                        return;
                    } else {
                        console.log("❌ Token inválido, permanecendo no login");
                        this.limparStorage();
                    }
                } else {
                    console.log("Nenhum token encontrado - Usuário precisa fazer login");
                }
                return;
            }

            if (currentPage.includes('PainelADM.html')) {
                if (!token) {
                    console.log("Acesso negado: nenhum token encontrado no painel");
                    this.redirectToLogin();
                    return;
                }

                const isValid = await this.validarToken(token);
                if (!isValid) {
                    console.log("Token inválido ou expirado no painel");
                    this.redirectToLogin();
                    return;
                }

                console.log("✅ Acesso permitido ao painel admin");
            }

        } catch (error) {
            console.error("💥 Erro crítico na verificação de sessão:", error);
            if (window.location.pathname.includes('PainelADM.html')) {
                this.redirectToLogin();
            }
        } finally {
            this.verificationInProgress = false;
            console.log("Verificação de sessão concluída");
        }
    }

    async validarToken(token) {
        try {
            console.log("Validando token no servidor...");
            const response = await fetch("http://localhost:8080/auth/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: token })
            });

            if (!response.ok) {
                console.log("❌ Erro na resposta do servidor");
                return false;
            }

            const data = await response.json();
            console.log("📋 Resposta da validação:", data);

            return data.valid && data.role === 'ROLE_ADMIN';
            
        } catch (error) {
            console.error("🌐 Erro de conexão na validação:", error);
            return false;
        }
    }

    redirectToLogin() {
        console.log("🔄 Redirecionando para página de login...");
        this.limparStorage();
        window.location.replace('login-admin.html');
    }

    limparStorage() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        console.log("Storage limpo");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Inicializando sistema de autenticação...");
    const auth = new Auth();
    auth.verificarSessao();
});