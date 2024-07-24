export class NotificationAPI {
	//----------* RequestPermission *----------//
	static requestPermission = () =>
		new Promise((resolve: (permission: NotificationPermission | 'error') => void) => {
			if (typeof window === undefined || !('Notification' in window)) return resolve('error');

			if (Notification.permission === 'granted') return resolve('granted');
			Notification.requestPermission()
				.then((permission) => resolve(permission))
				.catch((err) => resolve('error'));
		});
	//----------* Notif *----------//
	static notif = (title: string, options?: NotificationOptions) =>
		new Promise((resolve: (Notification: Notification | null) => any) => {
			if (typeof window === undefined || !('Notification' in window)) return resolve(null);

			this.requestPermission().then((permission) => {
				if (permission === 'granted') resolve(new Notification(title, options));
				else resolve(null);
			});
		});
}
