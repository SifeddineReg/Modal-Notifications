<template>
  <div :class="['notification', type]">
    <img :src="icon" alt="icon" class="icon">
    <div class="content">
      <h3 class="title">Modal Window</h3>
      <p class="message">{{ message }}</p>
    </div>
    <button class="close-btn" @click="closeNotification">✕</button>
  </div>
</template>
  
<script setup>
  import { computed, toRefs } from 'vue'
  import { useNotificationStore } from '@/stores/notifications'
  const props = defineProps({
    type: {
      type: String,
      required: true,
      validator: value => ['danger', 'success', 'warning', 'info'].includes(value)
    },
    id: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  })
  const { type, id, message } = toRefs(props)
  const store = useNotificationStore()
  const closeNotification = () => {
    store.deleteNotification(id.value)
  }
  const icon = computed(() => {
    switch (type.value) {
      case 'danger':
        return new URL('@/assets/icons/Danger.svg', import.meta.url).href
      case 'success':
        return new URL('@/assets/icons/CheckCircle.svg', import.meta.url).href
      case 'warning':
        return new URL('@/assets/icons/Warning.svg', import.meta.url).href
      case 'info':
        return new URL('@/assets/icons/Info.svg', import.meta.url).href
      default:
        return ''
    }
  })
</script>
<style scoped>
  .notification {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    position: relative;
    width: 400px;
  }
  .icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
  .content {
    flex: 1;
  }
  .title {
    font-size: 1.2em;
    margin: 0;
    font-weight: bold;
    display: flex;
  }
  .message {
    margin: 8px 0 0;
    font-size: 0.9em;
    text-align: start;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.2em;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
  .danger {
    border-color: rgba(210, 147, 147, 1);
    background-color: rgba(247, 228, 228, 1);
    color: rgba(66, 66, 66, 1);
  }
  .success {
    background-color: rgba(228, 247, 232, 1);
    border-color: rgba(137, 178, 145, 1);
    color: rgba(66, 66, 66, 1);
  }
  .warning {
    background-color: rgba(247, 242, 228, 1);
    border-color: rgba(212, 194, 150, 1);
    color: rgba(66, 66, 66, 1);
  }
  .info {
    border-color: rgba(150, 168, 216, 1);
    background-color: rgba(228, 233, 247, 1);
    color: rgba(66, 66, 66, 1);
  }
</style>