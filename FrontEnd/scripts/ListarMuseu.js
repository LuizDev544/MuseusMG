document.addEventListener("DOMContentLoaded", carregarMuseus);

async function carregarMuseus() {
    try {
        const resposta = await fetch("http://localhost:8080/api/admin/museus");

        if (!resposta.ok) {
            console.error("Erro ao buscar museus:", resposta.status);
            return;
        }

        const lista = await resposta.json();
        const tabela = document.querySelector("#tabelaEventos tbody");
        tabela.innerHTML = "";

        lista.forEach(m => {
            const row = `
                <tr>
                    <td>${m.id}</td>
                    <td>${m.museu}</td>
                    <td>${m.descricaomuseu}</td>
                    <td>${m.horarioabrir}</td>
                    <td>${m.horariosair}</td>
                    <td>${m.tema}</td>
                    <td>${m.capacidade}</td>
                    <td>${m.fundacao}</td>
                    <td>${m.endereco}</td>
                    <td>${m.preco}</td>
                    <td class="text-center">
                        <button class="btn btn-primary btn-sm" onclick="abrirFormulario(${m.id})">
                            Editar
                        </button>
                    </td>
                </tr>
            `;
            tabela.innerHTML += row;
        });

    } catch (erro) {
        console.error("Erro ao listar museus", erro);
    }
}


async function abrirFormulario(id) {

    const resposta = await fetch(`http://localhost:8080/api/admin/museus/${id}`);
    const museu = await resposta.json();

    document.getElementById("inputId").value = museu.id;
    document.getElementById("inputNome").value = museu.museu;
    document.getElementById("inputDescricao").value = museu.descricaomuseu;
    document.getElementById("InputEntrada").value = museu.horarioabrir;
    document.getElementById("inputSaida").value = museu.horariosair;
    document.getElementById("inputTema").value = museu.tema;
    document.getElementById("inputCapacidade").value = museu.capacidade;
    document.getElementById("inputFundacao").value = museu.fundacao;
    document.getElementById("inputEndereco").value = museu.endereco;
    document.getElementById("inputPreco").value = museu.preco;

    document.getElementById("formEdicao").classList.add("show");
}


document.getElementById("formEdicao").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("inputId").value;

    const museuAtualizado = {
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

    const resposta = await fetch(`http://localhost:8080/api/admin/museus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(museuAtualizado)
    });

    if (resposta.ok) {
        alert("Museu atualizado com sucesso!");
        fecharFormulario();
        carregarMuseus();
    } else {
        alert("Erro ao atualizar museu.");
    }
});
