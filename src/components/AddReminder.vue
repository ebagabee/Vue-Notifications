<template>
    <div>
        <button type="button" class="btn btn-primary" @click="showModal = true">
            Adicionar Lembrete
        </button>

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
                                <input v-model="message" id="message" type="text" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="phoneNumber" class="form-label">Número de Telefone:</label>
                                <input v-model="phoneNumber" id="phoneNumber" type="text" class="form-control" required>
                            </div>

                            <div class="mb-3">
                                <label for="dateTime" class="form-label">Data e Hora:</label>
                                <input v-model="dateTime" id="dateTime" type="datetime-local" class="form-control"
                                    required>
                            </div>

                            <div class="mb-3">
                                <label for="mood" class="form-label">Humor:</label>
                                <select v-model="mood" id="mood" class="form-select">
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
            dateTime: '',
            mood: '',
            showModal: false
        };
    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
        async submitReminder() {
            try {
                await axios.post('http://localhost:8080/api/reminder', {
                    message: this.message,
                    phoneNumber: this.phoneNumber,
                    dateTime: this.dateTime,
                    mood: this.mood
                });
                alert('Lembrete adicionado com sucesso');
                this.message = '';
                this.phoneNumber = '';
                this.dateTime = '';
                this.mood = '';
                this.showModal = false;
                this.$emit('reminder-added');
            } catch (error) {
                console.error('Houve um erro ao adicionar o lembrete:', error);
            }
        }
    }
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
}

.modal {
    display: block;
    z-index: 1050;
}
</style>