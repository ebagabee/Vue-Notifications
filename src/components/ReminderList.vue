<template>
    <div class="container">
        <h1>Lista de Lembretes</h1>
        <div v-for="reminder in reminders" :key="reminder.dateTime" class="card">
            <div class="card-body">
                <h5 class="card-title">{{ reminder.message }}</h5>
                <p class="card-text">
                    Número: {{ reminder.phoneNumber }}<br>
                    Data e Hora: {{ formatDateTime(reminder.dateTime) }}<br>
                    Humor: {{ reminder.mood }}
                </p>
                <button @click="sendMessage(reminder)">Enviar WhatsApp</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            reminders: []
        };
    },
    created() {
        this.fetchReminders();
    },
    methods: {
        async fetchReminders() {
            try {
                const response = await axios.get('http://localhost:8080/api/reminders');
                this.reminders = response.data;
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        },
        async sendMessage(reminder) {
            try {
                await axios.post('http://localhost:8080/api/send-message', {
                    message: reminder.message,
                    phoneNumber: reminder.phoneNumber
                });
                alert('Message sent successfully');
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to send message');
            }
        },
        formatDateTime(dateTime) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
            return new Date(dateTime).toLocaleDateString('pt-BR', options);
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 10px 0;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 15px;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
