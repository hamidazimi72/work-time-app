const defaultVersion = 'default-v1.0.0';

export class CacheAPI {
	static addAll = (requestsUrl = [], version = defaultVersion) =>
		caches
			.open(version)
			.then((cache) =>
				cache
					.addAll(requestsUrl)
					.then(() => ({ success: true, res: { urls: requestsUrl } }))
					.catch((err) => ({ success: false, res: err })),
			)
			.catch((err) => ({ success: false, res: err }));

	static match = (request) =>
		caches
			.match(request)
			.then((cache) => {
				if (cache) return { success: true, res: cache };
				else return { success: false, res: `not found in case: ${request?.url ?? ''}` };
			})
			.catch((err) => ({ success: false, res: err }));

	static put = (request, response, version = defaultVersion) =>
		caches
			.open(version)
			.then((cache) =>
				cache
					.put(request, response.clone ? response.clone() : response)
					.then((putResult) => ({ success: true, res: putResult }))
					.catch((err) => ({ success: false, res: err })),
			)
			.catch((err) => ({ success: false, res: err }));

	static deleteVersion = (version = defaultVersion) =>
		caches
			.delete(version)
			.then(() => ({ success: true, res: `${version} has been deleted` }))
			.catch((err) => ({ success: false, res: err }));

	static deleteDeprecatedVersions = (arrayOfVersions: any[] = []) => {
		const deletedKeys: any[] = [];
		return caches
			.keys()
			.then((keys: string[]) => {
				keys.map((key) => {
					if (!arrayOfVersions.includes(key)) {
						caches.delete(key).then(() => {
							deletedKeys.push(key);
						});
					}
				});
			})
			.then(() => ({ success: true, res: { deletedKeys } }))
			.catch((err) => ({ success: false, res: err }));
	};
}
