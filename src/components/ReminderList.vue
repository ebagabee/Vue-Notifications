<template>
    <div>
        <div v-if="reminders.length === 0">
            <p>Não há lembretes para mostrar.</p>
        </div>
        <div v-else>
            <ReminderCard v-for="reminder in reminders" :key="reminder.id" :reminder="reminder" />
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
                const response = await axios.get('http://localhost:8080/api/reminders');
                this.reminders = response.data;
            } catch (error) {
                console.error('Houve um erro ao buscar lembretes:', error);
            }
        }
    },
    mounted() {
        this.fetchReminders();
    }
};
</script>