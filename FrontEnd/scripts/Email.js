document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInput").value.trim();

    if (!email || !email.includes('@')) {
        alert("Por favor, insira um email válido.");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:8080/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const mensagem = await resposta.text();

        if (resposta.ok) {
            alert("Obrigado! Verifique seu e-mail.");
            document.getElementById("emailInput").value = "";
        } else {
            alert("Erro: " + mensagem);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão. Tente novamente.");
    }
});
