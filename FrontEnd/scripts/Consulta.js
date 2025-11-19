document.addEventListener('DOMContentLoaded', function () {
    console.log("🔍 Consultar.js carregado");
    verificarAutenticacao();
});

function mostrarMuseu(museu) {
    console.log("📌 Preenchendo formulário com dados do museu:", museu);
    document.querySelector('#txtnome').value = museu.museu || 'Não informado';
    document.querySelector('#txtdescricao').value = museu.descricaomuseu || 'Não informado';
    document.querySelector('#txtabrir').value = museu.horarioabrir || '';
    document.querySelector('#txtsair').value = museu.horariosair || '';
    document.querySelector('#txttema').value = museu.tema || 'Não informado';
    document.querySelector('#txtcapacidade').value = museu.capacidade || 'Não informado';
    document.querySelector('#txtfundacao').value = museu.fundacao || 'Não informado';
    document.querySelector('#txtendereco').value = museu.endereco || 'Não informado';
    document.querySelector('#txtpreco').value = museu.preco || '';

    console.log("✔ Formulário preenchido com sucesso!");
}

async function consultarMuseu() {
    const id = document.querySelector('#idmuseu').value.trim();

    console.log("🔎 Iniciando consulta para ID:", id);

    if (id.length < 1) {
        alert("ID inválido, insira um ID válido!");
        return;
    }

    const url = `http://localhost:8080/api/public/museus/${id}`;
    console.log("🌐 Endpoint usado:", url);

    try {
        const resposta = await fetch(url);
        console.log("📡 Status da resposta:", resposta.status);

        if (resposta.status === 200) {
            console.log("✔ Museu encontrado!");
            const museu = await resposta.json();

            mostrarMuseu(museu);

            document.getElementById('resultado').style.display = 'block';

        } else if (resposta.status === 404) {

            console.log("❌ Museu não encontrado!");
            alert("Museu com ID " + id + " não encontrado");

            document.getElementById('resultado').style.display = 'none';
            limparCampos();

        } else {
            console.log("⚠ Erro inesperado:", resposta.status);
            alert("Erro ao buscar museu. Código: " + resposta.status);

            document.getElementById('resultado').style.display = 'none';
            limparCampos();
        }

    } catch (erro) {
        console.error("🔥 Erro de conexão:", erro);
        alert("Erro de conexão com o servidor!");
        document.getElementById('resultado').style.display = 'none';
        limparCampos();
    }
}

function limparCampos() {
    console.log("🧹 Limpando campos...");

    document.querySelector('#txtnome').value = '';
    document.querySelector('#txtdescricao').value = '';
    document.querySelector('#txtabrir').value = '';
    document.querySelector('#txtsair').value = '';
    document.querySelector('#txttema').value = '';
    document.querySelector('#txtcapacidade').value = '';
    document.querySelector('#txtfundacao').value = '';
    document.querySelector('#txtendereco').value = '';
    document.querySelector('#txtduracao').value = '';
    document.querySelector('#txtpreco').value = '';
}
