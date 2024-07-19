<template>
  <div id="app">
    <button type="button" class="btn btn-primary" @click="showModal = true">
      Adicionar Novo Lembrete
    </button>
    <AddReminder v-if="showModal" @reminder-added="fetchReminders" @close="showModal = false" />
    <ReminderList ref="remindersList" />
  </div>
</template>

<script>
import ReminderList from './components/ReminderList.vue';
import AddReminder from './components/AddReminder.vue';

export default {
  components: {
    ReminderList,
    AddReminder
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    fetchReminders() {
      // Verifica se o componente ReminderList está disponível antes de chamar o método
      if (this.$refs.remindersList) {
        this.$refs.remindersList.fetchReminders();
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>