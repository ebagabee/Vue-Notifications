<template>
    <div>
        <div v-if="reminders.length === 0">
            <p>Não há lembretes para mostrar.</p>
        </div>
        <div v-else>
            <ReminderCard v-for="reminder in reminders" :key="reminder.id" :reminder="reminder"
                @reminder-deleted="removeReminder" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ReminderCard from './ReminderCard.vue';

export default {
    components: {
        ReminderCard
    },
    data() {
        return {
            reminders: []
        };
    },
    methods: {
        async fetchReminders() {
            try {
                const response = await axios.get('http://localhost:8000/api/reminders');
                this.reminders = response.data.reminders;
            } catch (error) {
                console.error('Houve um erro ao buscar lembretes:', error);
            }
        },
        removeReminder(id) {
            this.reminders = this.reminders.filter(reminder => reminder.id !== id);
        }
    },
    mounted() {
        this.fetchReminders();
    }
};
</script>