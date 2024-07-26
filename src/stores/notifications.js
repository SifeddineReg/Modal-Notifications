import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    createNotification(notification) {
      if (this.notifications.length >= 5) {
        this.notifications.shift();
      }
      this.notifications.push(notification);
    },
    deleteNotification(id) {
      this.notifications = this.notifications.filter(notification => notification.id !== id);
    }
  },
  getters: {
    getAllNotifications(state) {
      return state.notifications;
    },
    getNotificationById: (state) => (id) => {
      return state.notifications.find(notification => notification.id === id);
    }
  }
});