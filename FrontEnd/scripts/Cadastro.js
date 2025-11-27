// FrontEnd/scripts/museus/cadastrar-museu.js
class CadastrarMuseu {
    constructor() {
        this.form = null;
        this.msgElement = null;
    }

    init() {
        console.log("✅ Inicializando sistema de cadastro de museus...");
        this.form = document.getElementById("formCadastro");
        this.msgElement = document.getElementById("msg");
        
        if (this.form) {
            this.form.addEventListener("submit", (e) => this.cadastrarMuseu(e));
            console.log("✅ Formulário de cadastro configurado");
        } else {
            console.error("❌ Formulário de cadastro não encontrado");
        }
    }

    async cadastrarMuseu(e) {
        e.preventDefault();
        
        // Mostrar loading
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Cadastrando...";
        submitBtn.disabled = true;

        try {
            // Usar os nomes EXATOS que a entity espera
            const museu = {
                museu: document.getElementById("NomeMuseu").value,
                descricaomuseu: document.getElementById("DescicaoDoMuseu").value, // ← sem camelCase
                horarioabrir: document.getElementById("HorarioDeAbrir").value,    // ← sem camelCase
                horariosair: document.getElementById("HorarioDeSair").value,      // ← sem camelCase
                tema: document.getElementById("TemaDoMuseu").value,
                capacidade: parseInt(document.getElementById("CapacidadeDePessoas").value),
                fundacao: document.getElementById("fundacao").value,
                endereco: document.getElementById("endereco").value,
                preco: parseFloat(document.getElementById("preco").value)
            };

            console.log("📤 Enviando dados do museu:", museu);

            const response = await SecurityConfig.makeAuthenticatedRequest(
                "http://localhost:8080/api/admin/museus",
                {
                    method: "POST",
                    body: JSON.stringify(museu)
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Erro detalhado:", errorText);
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("✅ Museu cadastrado com sucesso:", data);

            this.mostrarMensagem("Museu cadastrado com sucesso!", "success");
            this.form.reset();

        } catch (err) {
            console.error("❌ Erro ao cadastrar museu:", err);
            this.mostrarMensagem("Erro: " + err.message, "error");
        } finally {
            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    mostrarMensagem(mensagem, tipo) {
        if (this.msgElement) {
            this.msgElement.textContent = mensagem;
            this.msgElement.style.color = tipo === "success" ? "green" : "red";
            
            // Auto-remover mensagem após 5 segundos
            setTimeout(() => {
                this.msgElement.textContent = "";
            }, 5000);
        }
    }
}

// Inicialização global
let cadastrarMuseu;

document.addEventListener('DOMContentLoaded', () => {
    cadastrarMuseu = new CadastrarMuseu();
});