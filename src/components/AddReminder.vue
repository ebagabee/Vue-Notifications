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
                                    <option value="Bob Esponja">Bob Esponja</option>
                                    <option value="Seu Siriguejo">Seu Siriguejo</option>
                                    <option value="Darth Vader">Darth Vader</option>
                                    <option value="Scooby Doo">Scooby Doo</option>
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
            this.$emit('show-loading', true);
            try {
                const response = await axios.post('http://localhost:8000/api/reminder', {
                    message: this.message,
                    phoneNumber: this.phoneNumber,
                    mood: this.mood
                });

                if (response.data.success) {
                    this.$emit('reminder-added');
                    this.message = '';
                    this.phoneNumber = '';
                    this.mood = '';
                    this.closeModal();
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    this.$emit('show-notification', { message: error.response.data.error, type: 'error' });
                } else {
                    console.error('Houve um erro ao adicionar o lembrete:', error);
                }
            } finally {
                this.$emit('show-loading', false);
            }
        }
    }
};
</script>

<style scoped>
.modal-dialog {
    max-width: 500px;
}

.modal-content {
    border-radius: 10px;
}
</style>
