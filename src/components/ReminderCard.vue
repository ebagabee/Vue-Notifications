<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ reminder.message }}</h5>
            <p class="card-text">Número: {{ reminder.phoneNumber }}</p>
            <p class="card-text">Data e Hora: {{ formattedDateTime }}</p>
            <p class="card-text">Humor: {{ reminder.mood }}</p>
            <div class="btn-container">
                <button class="btn btn-primary" @click="sendReminder">Enviar</button>
                <button class="btn btn-danger" @click="deleteReminder">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        reminder: Object
    },
    computed: {
        formattedDateTime() {
            const date = new Date(this.reminder.dateTime);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
    },
    methods: {
        async sendReminder() {
            this.$emit('show-loading', true);
            try {
                await axios.post('http://localhost:8000/api/send-reminder', {
                    message: this.reminder.message,
                    phoneNumber: this.reminder.phoneNumber,
                    character: this.reminder.mood
                });
                this.$emit('show-notification', { message: 'Mensagem enviada com sucesso', type: 'success' });
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
                this.$emit('show-notification', { message: 'Falha ao enviar mensagem', type: 'error' });
            } finally {
                this.$emit('show-loading', false);
            }
        },
        async deleteReminder() {
            try {
                await axios.delete(`http://localhost:8000/api/reminder/${this.reminder.id}`);
                this.$emit('reminder-deleted', this.reminder.id);
                this.$emit('show-notification', { message: 'Lembrete excluído com sucesso', type: 'success' });
            } catch (error) {
                console.error('Erro ao excluir lembrete:', error);
                this.$emit('show-notification', { message: 'Falha ao excluir lembrete', type: 'error' });
            }
        }
    }
};
</script>

<style scoped>
.card {
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: scale(1.02);
}

.card-body {
    padding: 20px;
}

.btn-container {
    display: flex;
    gap: 15px;
    justify-content: center;
}
</style>