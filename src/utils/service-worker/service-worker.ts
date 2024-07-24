export class ServiceWorker {
	static register = async (
		path = '/sw.js',
		registerOptions = { scope: '/' },
		controller = { log: true, promptCB: (e) => {} },
	) => {
		if (!window?.navigator?.serviceWorker) return console.log('[SW] Not Support');

		let promptEvent = null;

		const options = registerOptions || { scope: '/' };
		const log = controller?.log ?? true;
		const promptCB = controller?.promptCB && typeof controller?.promptCB === 'function' ? controller.promptCB : null;

		window.addEventListener('beforeinstallprompt', (e) => {
			promptEvent = e;

			if (promptCB) {
				e.preventDefault();
				promptCB(promptEvent);
			}
		});

		try {
			const registration = await navigator.serviceWorker.register(path, options);

			log && console.log(`[SW] Registered In Scope: ${registration.scope}`);

			return registration;
		} catch (err) {
			(err) => console.log('[SW] Registeration Error ', err);
			return null;
		}
	};
}
