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
        
    const data = await response.json();
    console.log("Evento cadastrado:", data);

    msg.textContent = "Evento cadastrado com sucesso!";
    msg.style.color = "green";
    form.reset();
} catch (err) {
    console.error("Erro ao cadastrar evento:", err);
    msg.textContent = "Erro: " + err.message;
    msg.style.color = "red";}
})  
