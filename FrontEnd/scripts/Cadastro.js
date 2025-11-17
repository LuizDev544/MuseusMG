form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const evento = {
        NomeMuseu: document.getElementById("NomeMuseu").value,
        DescicaoDoMuseu: document.getElementById("DescicaoDoMuseu").value,
        HorarioDeAbrir: document.getElementById("HorarioDeAbrir").value,
        HorarioDeSair: document.getElementById("HorarioDeSair").value,
        TemaDoMuseu: parseFloat(document.getElementById("TemaDoMuseu").value),
        CapacidadeDePessoas: parseInt(document.getElementById("CapacidadeDePessoas").value),
        fundacao: document.getElementById("fundacao").value,
        endereco: document.getElementById("endereco").value,
        duracaoDoEvento: document.getElementById("duracaoDoEvento").value,
        preco: document.getElementById("preco").value
    };

    try {
        const response = await fetch("http//localhost:8080/api/admin/museus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();
        console.log("Evento cadastrado:", data);

        msg.textContent = "Evento cadastrado com sucesso!";
        msg.style.color = "green";
        form.reset();

    } catch (err) {
        console.error("Erro ao cadastrar evento:", err);
        msg.textContent = "Erro: " + err.message;
        msg.style.color = "red";
    }
});
