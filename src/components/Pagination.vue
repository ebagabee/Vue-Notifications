<template>
  <div class="pagination-container">
    <button @click="changePage(currentPage - 1)" :disabled="isPreviousDisabled" class="pagination-button">
      Anterior
    </button>
    <span class="pagination-info">Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="isNextDisabled" class="pagination-button">
      Próximo
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalItems: Number,
    itemsPerPage: Number
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    isPreviousDisabled() {
      return this.currentPage <= 1;
    },
    isNextDisabled() {
      return this.currentPage >= this.totalPages;
    }
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.pagination-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 16px;
  margin: 0 10px;
}
</style>
