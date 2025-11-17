async function abrirEdicao(id) {

    let resposta = await fetch(`http://localhost:8080/api/museus/${id}`);
    let m = await resposta.json();

    document.getElementById("inputId").value = m.id;
    document.getElementById("inputNome").value = m.museu;
    document.getElementById("inputDescricao").value = m.descricaomuseu;
    document.getElementById("InputEntrada").value = m.horarioabrir;
    document.getElementById("inputSaida").value = m.horariosair;
    document.getElementById("inputTema").value = m.tema;
    document.getElementById("inputCapacidade").value = m.capacidade;
    document.getElementById("inputFundacao").value = m.fundacao;
    document.getElementById("inputEndereco").value = m.endereco;
    document.getElementById("inputPreco").value = m.preco;

    document.getElementById("formEdicao").classList.add("show");
}

function fecharFormulario() {
    document.getElementById("formEdicao").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

document.getElementById("formEdicao").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        id: document.getElementById("inputId").value,
        museu: document.getElementById("inputNome").value,
        descricaomuseu: document.getElementById("inputDescricao").value,
        horarioabrir: document.getElementById("InputEntrada").value,
        horariosair: document.getElementById("inputSaida").value,
        tema: document.getElementById("inputTema").value,
        capacidade: document.getElementById("inputCapacidade").value,
        fundacao: document.getElementById("inputFundacao").value,
        endereco: document.getElementById("inputEndereco").value,
        preco: document.getElementById("inputPreco").value
    };

    fetch(`http://localhost:8080/api/museus/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .then(() => {
            alert("Museu atualizado com sucesso!");
            fecharFormulario();
            location.reload();
        })
        .catch(() => alert("Erro ao atualizar."));
});