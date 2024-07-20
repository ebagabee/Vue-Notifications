<template>
    <div>
        <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;"
            aria-labelledby="addReminderModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addReminderModalLabel">Adicionar Lembrete</h5>
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitReminder">
                            <div class="mb-3">
                                <label for="message" class="form-label">Mensagem:</label>
                                <input v-model="message" id="message" type="text" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="phoneNumber" class="form-label">Número de Telefone:</label>
                                <input v-model="phoneNumber" id="phoneNumber" type="text" class="form-control"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="mood" class="form-label">Humor:</label>
                                <select v-model="mood" id="mood" class="form-select" required>
                                    <option value="bobEsponja">Bob Esponja</option>
                                    <option value="seuSirigueijo">Seu Sirigueijo</option>
                                    <option value="darthVader">Darth Vader</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Adicionar Lembrete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="modal-backdrop fade show" @click="closeModal"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            message: '',
            phoneNumber: '',
            mood: '',
            showModal: true
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async submitReminder() {
            try {
                await axios.post('http://localhost:8000/api/reminder', {
                    message: this.message,
                    phoneNumber: this.phoneNumber,
                    mood: this.mood
                });
                this.$emit('reminder-added');
                this.message = '';
                this.phoneNumber = '';
                this.mood = '';
                this.closeModal();
            } catch (error) {
                console.error('Houve um erro ao adicionar o lembrete:', error);
            }
        }
    }
};
</script>