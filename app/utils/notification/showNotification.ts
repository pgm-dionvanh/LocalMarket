import toast from 'react-hot-toast';

import { Notification } from './notification';

export default function showNotification({ text, type }: Notification) {
  switch (type) {
    case 'success':
      return toast.success(text);
    case 'error':
      return toast.error(text);
    default:
      return toast(text);
  }
}