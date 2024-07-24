<template>
  <div id="app">
    <!-- Modal para adicionar lembrete -->
    <AddReminder v-if="showModal" @reminder-added="fetchReminders" @close="showModal = false" />

    <!-- Botão para adicionar novo lembrete -->
    <button type="button" class="btn btn-primary mt-3" @click="showModal = true">
      Adicionar Novo Lembrete
    </button>

    <!-- Filtro de data -->
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12">
          <DateFilter @filter-applied="applyDateFilter" />
        </div>
      </div>
    </div>

    <!-- Lista de lembretes -->
    <ReminderList ref="remindersList" :current-page="currentPage" :items-per-page="itemsPerPage" :start-date="startDate"
      :end-date="endDate" @page-changed="handlePageChange" />
  </div>
</template>

<script>
import ReminderList from './components/ReminderList.vue';
import AddReminder from './components/AddReminder.vue';
import DateFilter from './components/DateFilter.vue';

export default {
  components: {
    ReminderList,
    AddReminder,
    DateFilter
  },
  data() {
    return {
      showModal: false,
      currentPage: 1,
      itemsPerPage: 15,
      startDate: null,
      endDate: null
    };
  },
  methods: {
    fetchReminders() {
      this.$refs.remindersList.fetchReminders();
    },
    applyDateFilter(startDate, endDate) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.fetchReminders();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchReminders();
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>