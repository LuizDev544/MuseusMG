document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;

    const response = await fetch("http://localhost:8080/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    if (response.ok) {
        alert("E-mail enviado com sucesso!");
    } else {
        alert("Erro ao enviar.");
    }
});