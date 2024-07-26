<script setup>
import { ref } from 'vue';
import baseNotification from './components/baseNotification.vue';
import { useNotificationStore } from '@/stores/notifications';

const store = useNotificationStore();
const notificationId = ref(1);
const notificationMessage = ref('');
const notificationType = ref('info');

const addNotification = () => {
  store.createNotification({
    id: notificationId.value++,
    type: notificationType.value,
    message: notificationMessage.value,
  });
  notificationMessage.value = '';
};
</script>

<template>
  <main>
    <div class="input-container">
      <input v-model="notificationMessage" placeholder="Enter notification message" />
      <select v-model="notificationType">
        <option value="danger">Danger</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
      </select>
      <button @click="addNotification">Add Notification</button>
    </div>
    <div class="notifications">
      <baseNotification
        v-for="notification in store.getAllNotifications"
        :key="notification.id"
        :type="notification.type"
        :id="notification.id"
        :message="notification.message"
      ></baseNotification>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Trykker&display=swap');
main {
  font-family: 'DM Sans', sans-serif;
  text-align: center;
}

.input-container {
  display: flex;
  margin-top: 1rem;
}

.input-container input{
  padding: 10px;
  border-radius: 10px 0px 0px 10px;
  border: 0;
}

.input-container input:focus{
  outline: none;
}

.input-container button{
  cursor: pointer;
  padding: 10px;
  border-radius: 0px 10px 10px 0px;
  border: 0;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}

.input-container select {
  padding: 10px;
  border: 0;
  margin: 0;
}
.notifications {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 300px;
}
</style>