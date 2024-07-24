<template>
    <div>
        <div v-if="reminders.length === 0">
            <p>Não há lembretes para mostrar.</p>
        </div>
        <div v-else>
            <div class="reminder-grid">
                <ReminderCard v-for="reminder in reminders" :key="reminder.id" :reminder="reminder"
                    @reminder-deleted="removeReminder" />
            </div>
            <Pagination :current-page="currentPage" :total-items="totalReminders" :items-per-page="itemsPerPage"
                @page-changed="handlePageChange" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ReminderCard from './ReminderCard.vue';
import Pagination from './Pagination.vue';

export default {
    components: {
        ReminderCard,
        Pagination
    },
    props: {
        currentPage: Number,
        itemsPerPage: Number,
        startDate: String,
        endDate: String
    },
    data() {
        return {
            reminders: [],
            totalReminders: 0
        };
    },
    methods: {
        async fetchReminders() {
            try {
                const response = await axios.get('http://localhost:8000/api/reminders', {
                    params: {
                        page: this.currentPage,
                        perPage: this.itemsPerPage,
                        startDate: this.startDate,
                        endDate: this.endDate
                    }
                });
                this.reminders = response.data.reminders;
                this.totalReminders = response.data.total;
            } catch (error) {
                console.error('Houve um erro ao buscar lembretes:', error);
            }
        },
        handlePageChange(page) {
            this.$emit('page-changed', page); // Emitir evento para a mudança de página
        },
        removeReminder(id) {
            this.reminders = this.reminders.filter(reminder => reminder.id !== id);
        }
    },
    watch: {
        currentPage: 'fetchReminders',
        startDate: 'fetchReminders',
        endDate: 'fetchReminders'
    },
    mounted() {
        this.fetchReminders();
    }
};
</script>

<style scoped>
.reminder-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.card {
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>