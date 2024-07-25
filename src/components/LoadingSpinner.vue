<template>
    <div v-if="isLoading" class="spinner-overlay">
        <div class="spinner-border text-primary" role="status"></div>
        <p>Calma, calma, estamos acordando o personagem...</p>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(128, 128, 128, 0.5);
    z-index: 9999;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

.spinner-overlay p {
    margin-top: 10px;
    color: #fff;
}
</style>