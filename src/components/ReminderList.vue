<template>
    <div>
        <AddReminder @reminder-added="fetchReminders" />

        <div class="row">
            <div class="col-md-4" v-for="reminder in reminders" :key="reminder.dateTime">
                <ReminderCard :reminder="reminder" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ReminderCard from './ReminderCard.vue';
import AddReminder from './AddReminder.vue';

export default {
    components: {
        ReminderCard,
        AddReminder
    },
    data() {
        return {
            reminders: []
        };
    },
    async created() {
        this.fetchReminders();
    },
    methods: {
        async fetchReminders() {
            try {
                const response = await axios.get('http://localhost:8080/api/reminders');
                this.reminders = response.data;
            } catch (error) {
                console.error('Houve um erro ao buscar os lembretes:', error);
            }
        }
    }
};
</script>

<style>
.row {
    margin-top: 20px;
}
</style>