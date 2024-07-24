<template>
    <div class="date-filter">
        <label for="start-date">Data Início:</label>
        <input type="date" id="start-date" v-model="startDate" class="form-control" />
        <label for="end-date">Data Fim:</label>
        <input type="date" id="end-date" v-model="endDate" class="form-control" />
        <button @click="applyFilter" class="btn btn-secondary">Aplicar Filtro</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startDate: '',
            endDate: ''
        };
    },
    methods: {
        applyFilter() {
            this.$emit('filter-applied', this.startDate, this.endDate);
        }
    }
};
</script>

<style scoped>
.date-filter {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.date-filter input,
.date-filter button {
    width: 100%;
    max-width: 300px;
}
</style>
