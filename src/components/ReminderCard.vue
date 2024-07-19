<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ reminder.message }}</h5>
            <p class="card-text">Número: {{ reminder.phoneNumber }}</p>
            <p class="card-text">Data e Hora: {{ formattedDateTime }}</p>
            <p class="card-text">Humor: {{ reminder.mood }}</p>
            <button class="btn btn-primary" @click="sendReminder">Enviar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 'axios'

export default {
    props: {
        reminder: Object
    },
    computed: {
        formattedDateTime() {
            const date = new Date(this.reminder.dateTime);
            return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
        }
    },
    methods: {
        async sendReminder() {
            try {
                await axios.post('http://localhost:8080/api/send-message', {
                    message: this.reminder.message,
                    phoneNumber: this.reminder.phoneNumber,
                    character: this.reminder.mood // Supondo que o `character` será usado no backend
                });
                alert('Mensagem enviada com sucesso');
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
                alert('Falha ao enviar mensagem');
            }
        }
    }
};
</script>

<style scoped>
.card {
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 15px;
}
</style>