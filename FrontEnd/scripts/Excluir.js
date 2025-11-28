document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("deleteForm");
    const mensagem = document.getElementById("mensagem");
    const btnExcluir = document.getElementById("btnExcluir");
    const loadingSpinner = document.getElementById("loadingSpinner");

    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    if (typeof ProtectedAuth !== 'undefined') {
        const protectedAuth = new ProtectedAuth();
        protectedAuth.onAuthenticationSuccess = (username) => {
            console.log(`✅ Administrador ${username} autenticado - Painel de Exclusão`);
        };
        protectedAuth.init();
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await excluirEvento();
    });

    async function excluirEvento() {
        const eventId = document.getElementById("eventId").value.trim();

        if (!eventId || eventId <= 0) {
            mostrarMensagem("Insira um ID válido (maior que 0).", "error");
            return;
        }

        const confirmar = confirm(`⚠️ ATENÇÃO: Tem certeza que deseja excluir permanentemente o evento ID ${eventId}?\n\nEsta ação não pode ser desfeita.`);

        if (!confirmar) {
            mostrarMensagem("Exclusão cancelada.", "warning");
            return;
        }

        mostrarLoading(true);

        try {
            const response = await SecurityConfig.makeAuthenticatedRequest(
                `${SecurityConfig.API_ENDPOINTS.MUSEUS}/${eventId}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {
                mostrarMensagem(`✅ Evento ID ${eventId} excluído com sucesso!`, "success");
                form.reset();
            }
            else if (response.status === 404) {
                mostrarMensagem("❌ Evento não encontrado. Verifique o ID informado.", "warning");
            }
            else if (response.status === 403) {
                mostrarMensagem("🚫 Acesso negado. Você não tem permissão para excluir eventos.", "error");
            }
            else if (response.status === 401) {
                mostrarMensagem("🔐 Sessão expirada. Redirecionando para login...", "error");
                setTimeout(() => window.location.href = 'login-admin.html', 2000);
            }
            else {
                mostrarMensagem("❌ Erro interno ao excluir evento. Tente novamente.", "error");
            }

        } catch (error) {
            console.error("Erro na exclusão:", error);

            if (error.message.includes('Acesso negado') || error.message.includes('Não autorizado')) {
                mostrarMensagem("Sessão expirada. Redirecionando para login...", "error");
                setTimeout(() => window.location.href = 'login-admin.html', 2000);
            } else if (error.message.includes('Token')) {
                mostrarMensagem("Erro de autenticação. Redirecionando...", "error");
                setTimeout(() => window.location.href = 'login-admin.html', 2000);
            } else {
                mostrarMensagem("❌ Erro: não foi possível conectar ao servidor.", "error");
            }
        } finally {
            mostrarLoading(false);
        }
    }

    function mostrarMensagem(texto, tipo = "info") {
        mensagem.textContent = texto;

        mensagem.className = 'mt-3 text-center fw-bold';

        switch (tipo) {
            case "success":
                mensagem.classList.add('text-success');
                break;
            case "error":
                mensagem.classList.add('text-danger');
                break;
            case "warning":
                mensagem.classList.add('text-warning');
                break;
            default:
                mensagem.classList.add('text-info');
        }

        if (tipo === "success") {
            setTimeout(() => {
                mensagem.textContent = "";
                mensagem.className = 'mt-3 text-center fw-bold';
            }, 5000);
        }
    }

    function mostrarLoading(mostrar) {
        if (loadingSpinner) {
            loadingSpinner.classList.toggle('d-none', !mostrar);
        }

        if (btnExcluir) {
            btnExcluir.disabled = mostrar;
            if (mostrar) {
                btnExcluir.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Excluindo...';
            } else {
                btnExcluir.innerHTML = '<i data-feather="trash-2"></i> Excluir Evento';
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
        }
    }

    document.getElementById("eventId").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });
});