import { NOTIFY_USER } from './index';

export const notifyUser = (message, messageType) => {
    return {
        type: NOTIFY_USER,
        message,
        messageType
    }
}