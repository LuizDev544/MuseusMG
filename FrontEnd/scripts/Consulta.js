document.addEventListener('DOMContentLoaded', function() {
    console.log("🔍 Consultar.js carregado");
    verificarAutenticacao();
});

function mostrarEvento(evento) {
    console.log("Preenchendo formulário com dados do museu:", evento);
    
    document.querySelector('#txtnome').value = evento.nomeEvento || 'Não informado';
    document.querySelector('#txtdescricao').value = evento.descricaoDoEvento || 'Não informado';
    document.querySelector('#txtabrir').value = evento.dataDoEvento ? evento.dataDoEvento.split('T')[0] : '';
    document.querySelector('#txtsair').value = evento.localDoEvento || 'Não informado';
    document.querySelector('#txttema').value = evento.precoDoEvento != null ? `R$ ${evento.precoDoEvento.toFixed(2)}` : 'Grátis';
    document.querySelector('#txtcapacidade').value = evento.capacidadeDePessoasNoEvento != null ? evento.capacidadeDePessoasNoEvento + ' pessoas' : 'Não informado';
    document.querySelector('#txttipo').value = evento.tipoDoEvento || 'Não informado';
    document.querySelector('#txtendereco').value = evento.apresentadorDoEvento || 'Não informado';
    document.querySelector('#txtduracao').value = evento.duracaoDoEvento || 'Não informado';
    
    console.log("Formulário preenchido com sucesso!");
}

async function consultarMuseu() {
    const id = document.querySelector('#idevento').value.trim();
    
    console.log("Iniciando consulta para ID:", id);
    
    if (id.length < 1){
        alert("ID inválido, insira outro novamente");
        return;
    }

    const url = `http://localhost:8080/api/public/eventos/${id}`;
    
    console.log("Usando endpoint público:", url);
    
    try {
        const resposta = await fetch(url);

        console.log("Status da resposta:", resposta.status);

        if(resposta.status === 200){
            console.log("Evento encontrado!");
            const evento = await resposta.json();
            console.log("Dados do evento:", evento);
            mostrarEvento(evento);
            document.getElementById('resultado').style.display = 'block';
            
        } else if (resposta.status === 404) {
            console.log("Evento não encontrado");
            alert("Evento com ID: " + id + " não encontrado");
            document.getElementById('resultado').style.display = 'none';
            limparCampos();
        } else {
            console.log("Erro desconhecido:", resposta.status);
            alert("Erro ao buscar evento. Código: " + resposta.status);
            document.getElementById('resultado').style.display = 'none';
            limparCampos();
        }

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("Erro de conexão com o servidor!");
        document.getElementById('resultado').style.display = 'none';
        limparCampos();
    }
}

function limparCampos() {
    document.querySelector('#txtnome').value = '';
    document.querySelector('#txtdescricao').value = '';
    document.querySelector('#txtdataevento').value = '';
    document.querySelector('#txtlocal').value = '';
    document.querySelector('#txtpreco').value = '';
    document.querySelector('#txtcapacidade').value = '';
    document.querySelector('#txttipo').value = '';
    document.querySelector('#txtapresentador').value = '';
    document.querySelector('#txtduracao').value = '';
}