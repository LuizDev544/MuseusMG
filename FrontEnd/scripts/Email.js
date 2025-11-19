document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;

    const resposta = await fetch("http://localhost:8080/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    if (resposta.ok) {
        alert("Obrigado! Verifique seu e-mail.");
    } else {
        alert("Erro ao enviar. Tente novamente.");
    }
});
