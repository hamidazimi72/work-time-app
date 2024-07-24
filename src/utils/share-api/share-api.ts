export class ShareAPI {
	//----------* CanShare *----------//
	static canShare = (data?: ShareData): boolean => {
		try {
			if (!navigator?.canShare || !data) return false;
			return navigator?.canShare(data);
		} catch (error) {
			return false;
		}
	};

	//----------* Share *----------//
	static share = (data?: ShareData) =>
		new Promise((resolve: (result: boolean) => any) => {
			try {
				const canShare = this.canShare(data);

				if (!navigator?.share || !canShare) resolve(false);

				navigator
					?.share(data)
					.then(() => resolve(true))
					.catch(() => resolve(false));
			} catch (error) {
				resolve(false);
			}
		});
}
