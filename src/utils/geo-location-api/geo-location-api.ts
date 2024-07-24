export class GeoLocationAPI {
	//----------* GetCurrentPosition *----------//
	static getCurrentPosition = (options?: PositionOptions) =>
		new Promise((resolve: (result: GeolocationPosition) => any, reject: (error: GeolocationPositionError | string) => any) => {
			if (!navigator?.geolocation?.getCurrentPosition) return reject('[GeoLocation] - getCurrentPosition Method Not Support');

			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(err) => reject(err),
				options,
			);
		});

	//----------* WatchPosition *----------//
	static watchPosition = (options?: PositionOptions) =>
		new Promise(
			(
				resolve: (result: GeolocationPosition, stop: () => any) => any,
				reject: (error: GeolocationPositionError | string) => any,
			) => {
				if (!navigator?.geolocation?.watchPosition) return reject('[GeoLocation] - watchPosition Method Not Support');

				const watchId = navigator.geolocation.watchPosition(
					(position) =>
						resolve(position, () => {
							try {
								navigator?.geolocation.clearWatch(watchId);
							} catch (error) {}
						}),
					(err) => reject(err),
					options,
				);
			},
		);
}
