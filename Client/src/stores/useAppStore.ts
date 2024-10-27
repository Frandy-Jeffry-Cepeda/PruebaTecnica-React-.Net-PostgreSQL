import { TrendingUpDownIcon } from 'lucide-react';
import { create } from 'zustand';

type Notification = {
    text: string;
    error: boolean;
    show: boolean;
};

type NotificationStore = {
    notification: Notification;
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void;
    hideNotification: () => void;
};

export const useAppStore = create<NotificationStore>((set) => ({
    notification: {
        text: '',
        error: true,
        show: false,
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true,
            },
        });

        
            setTimeout(() => {
                set({
                    notification: {
                        text: '',
                        error: false,
                        show: false,
                    },
                });
            }, 5000);

    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false,
            },
        });
    },
}));

