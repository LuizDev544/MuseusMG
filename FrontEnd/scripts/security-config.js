// FrontEnd/scripts/auth/security-config.js
class SecurityConfig {
    static get BASE_URL() {
        return 'http://localhost:8080';
    }

    static get AUTH_ENDPOINTS() {
        return {
            LOGIN: `${this.BASE_URL}/auth/login`,
            VALIDATE: `${this.BASE_URL}/auth/validate`,
            LOGOUT: `${this.BASE_URL}/auth/logout`
        };
    }

    static get API_ENDPOINTS() {
        return {
            MUSEUS: `${this.BASE_URL}/api/admin/museus`
        };
    }

    static async makeAuthenticatedRequest(url, options = {}) {
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        const response = await fetch(url, { ...defaultOptions, ...options });
        
        if (response.status === 403) {
            throw new Error('Acesso negado - token inválido ou expirado');
        }

        if (response.status === 401) {
            throw new Error('Não autorizado');
        }

        return response;
    }

    static getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    static clearAuthData() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('jwtToken');
        const userData = this.getUserData();
        return !!(token && userData && userData.role === 'ROLE_ADMIN');
    }
}

// Tornar global para compatibilidade
window.SecurityConfig = SecurityConfig;