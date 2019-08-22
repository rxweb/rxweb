export  class ControlState {
    static controlId: number = 1;

    static controls: { [key: string]: any } = {};
}

export class NotificationState {
    static notificationId: number = 1;

    static notifications: {
        [key: string]: any
    } = {};
}