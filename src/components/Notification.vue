<template>
    <div v-if="message" :class="`notification ${notificationClass}`">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'info' // Pode ser 'success' ou 'error'
        }
    },
    computed: {
        notificationClass() {
            return this.type === 'success' ? 'notification-success' : 'notification-error';
        }
    }
};
</script>

<style scoped>
.notification {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    z-index: 9999;
    font-size: 24px;
}

.notification-success {
    background-color: #4caf4fe7;
}

.notification-error {
    background-color: #f44336e0;
}
</style>