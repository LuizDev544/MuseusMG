document.addEventListener("DOMContentLoaded", async () => {
    const tabela = document.querySelector("#tabelaEventos tbody");

    try {
        const response = await fetch("http://localhost:8080/api/admin/museus");

        if (!response.ok) {
            tabela.innerHTML = `<tr><td colspan="11" class="text-danger text-center">Erro ao carregar museus.</td></tr>`;
            return;
        }

        const museus = await response.json();
        console.log(museus); // Debug

        if (museus.length === 0) {
            tabela.innerHTML = `<tr><td colspan="11" class="text-center">Nenhum museu encontrado.</td></tr>`;
            return;
        }

        tabela.innerHTML = "";

        museus.forEach(m => {
            const row = document.createElement("tr");

            row.innerHTML = `
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
                    <button class="btn btn-sm btn-warning" onclick="editarMuseu(${m.id})">✏️ Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirMuseu(${m.id})">🗑️ Excluir</button>
                </td>
            `;

            tabela.appendChild(row);
        });

    } catch (error) {
        console.error(error);
        tabela.innerHTML = `<tr><td colspan="11" class="text-danger text-center">Erro ao conectar ao servidor.</td></tr>`;
    }
});

function editarMuseu(id) {
    console.log("Editar:", id);
}

async function excluirMuseu(id) {
    if (!confirm(`Excluir museu ID ${id}?`)) return;

    try {
        const resp = await fetch(`http://localhost:8080/api/admin/museus/${id}`, {
            method: "DELETE"
        });

        if (resp.ok) {
            alert("Excluído com sucesso!");
            location.reload();
        } else {
            alert("Erro ao excluir.");
        }

    } catch (err) {
        console.error(err);
        alert("Falha ao conectar ao servidor.");
    }
}
