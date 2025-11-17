document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("deleteForm");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const eventId = document.getElementById("eventId").value.trim();

        if (!eventId) {
            mensagem.style.color = "red";
            mensagem.textContent = "Insira um ID válido.";
            return;
        }

        const confirmar = confirm(`Tem certeza que deseja excluir o evento ID ${eventId}?`);

        if (!confirmar) return;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/museus/${eventId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                mensagem.style.color = "green";
                mensagem.textContent = `Evento ID ${eventId} excluído com sucesso!`;
                document.getElementById("eventId").value = "";
            } 
            else if (response.status === 404) {
                mensagem.style.color = "orange";
                mensagem.textContent = "Evento não encontrado.";
            } 
            else {
                mensagem.style.color = "red";
                mensagem.textContent = "Erro ao excluir evento.";
            }

        } catch (error) {
            console.error(error);
            mensagem.style.color = "red";
            mensagem.textContent = "Erro: não foi possível conectar ao servidor.";
        }
    });
});
