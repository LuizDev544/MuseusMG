const form = document.getElementById("formCadastro");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const museu = {
        museu: document.getElementById("NomeMuseu").value,
        descricaomuseu: document.getElementById("DescicaoDoMuseu").value,
        horarioabrir: document.getElementById("HorarioDeAbrir").value,
        horariosair: document.getElementById("HorarioDeSair").value,
        tema: (document.getElementById("TemaDoMuseu").value),
        capacidade: parseInt(document.getElementById("CapacidadeDePessoas").value),
        fundacao: document.getElementById("fundacao").value,
        endereco: document.getElementById("endereco").value,
        preco: document.getElementById("preco").value
    };

    try {
        const response = await fetch("http://localhost:8080/api/admin/museus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(museu)
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();
        console.log("Museu cadastrado:", data);

        msg.textContent = "Museu cadastrado com sucesso!";
        msg.style.color = "green";
        form.reset();

    } catch (err) {
        console.error("Erro ao cadastrar museu:", err);
        msg.textContent = "Erro: " + err.message;
        msg.style.color = "red";
    }
});
