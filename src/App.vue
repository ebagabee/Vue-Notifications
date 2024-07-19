<template>
  <div id="app">
    <RemindersList />
  </div>
</template>

<script>
import RemindersList from './components/ReminderList.vue';

export default {
  components: {
    RemindersList
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
