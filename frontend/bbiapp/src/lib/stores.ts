import { writable } from "svelte/store";

interface INotificationStore {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  show: boolean;
  timeout: number;
}

// Notification store, to store  the notification array, show and remove notifications after a timeout

const notifications = writable<INotificationStore[]>([]);

const notificationStore = {
  subscribe: notifications.subscribe,
  show: (
    message: string,
    type: "success" | "error" | "warning" | "info",
    timeout = 5000,
  ) => {
    notifications.update((n) => {
      n = n.map((notification) => {
        notification.show = false;
        return notification;
      });
      const id = new Date().getTime();
      n.push({ message, type, show: true, timeout, id });
      setTimeout(() => {
        notificationStore.remove(id);
      }, timeout);
      return n;
    });
  },
  remove: (id: number) => {
    notifications.update((n) => {
      // first create a map with all notifications, then remove the notification at the index and return the new array
      n = n.map((notification) => {
        if (notification.id === id) {
          notification.show = false;
        }
        return notification;
      });
      if (n.every((notification) => !notification.show)) {
        return [];
      }
      return n;
    });
  },
};

// usage
// import { notificationStore } from './stores';
//
// notificationStore.show('This is a success message', 'success');

// const unsubscribe = notificationStore.subscribe((notifications) => {
//     console.log(notifications);
// });

// unsubscribe();

export { notificationStore, type INotificationStore };
