<template>
  <div id="app">
    <AddReminder v-if="showModal" @reminder-added="fetchReminders" @close="showModal = false"
      @show-loading="handleLoading" @show-notification="showNotification" />
    <button type="button" class="btn btn-primary mt-3" @click="showModal = true">
      Adicionar Novo Lembrete
    </button>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12">
          <DateFilter @filter-applied="applyDateFilter" @filter-cleared="clearFilters"/>
        </div>
      </div>
    </div>
    <ReminderList ref="remindersList" :current-page="currentPage" :items-per-page="itemsPerPage" :start-date="startDate"
      :end-date="endDate" @page-changed="handlePageChange" @show-loading="handleLoading"
      @show-notification="showNotification" />
    <LoadingSpinner :isLoading="isLoading" />
    <Notification v-if="notificationMessage" :message="notificationMessage" :type="notificationType" />
  </div>
</template>

<script>
import ReminderList from './components/ReminderList.vue';
import AddReminder from './components/AddReminder.vue';
import DateFilter from './components/DateFilter.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import Notification from './components/Notification.vue';

export default {
  components: {
    ReminderList,
    AddReminder,
    DateFilter,
    LoadingSpinner,
    Notification
  },
  data() {
    return {
      showModal: false,
      currentPage: 1,
      itemsPerPage: 12,
      startDate: null,
      endDate: null,
      isLoading: false,
      notificationMessage: '',
      notificationType: 'info',
    };
  },
  methods: {
    async fetchReminders() {
      this.isLoading = true;
      try {
        await this.$refs.remindersList.fetchReminders();
      } finally {
        this.isLoading = false;
      }
    },
    applyDateFilter(startDate, endDate) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.fetchReminders();
    },
    clearFilters() {
      this.startDate = null;
      this.endDate = null;
      this.currentPage = 1;
      this.fetchReminders();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchReminders();
    },
    handleLoading(state) {
      this.isLoading = state;
    },
    showNotification({ message, type }) {
      this.notificationMessage = message;
      this.notificationType = type; 
      setTimeout(() => {
        this.notificationMessage = '';
      }, 3000); 
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
