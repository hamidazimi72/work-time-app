export class HistoryAPI {
	//----------* PushState *----------//
	static pushState = (data: any, url?: string, scrollRestoration?: ScrollRestoration) => {
		let defaultScrollRestoration = history.scrollRestoration;

		if (scrollRestoration) history.scrollRestoration = scrollRestoration;

		history?.pushState(data, '', url);

		if (scrollRestoration && defaultScrollRestoration && scrollRestoration !== defaultScrollRestoration)
			history.scrollRestoration = defaultScrollRestoration;
	};

	//----------* GetStateData *----------//
	static getStateData = () => {
		return history?.state;
	};

	//----------* GetStateData *----------//
	static back = () => {
		try {
			history?.back();
		} catch (error) {}
	};

	// push state for prevent default back
	// 1 => history.pushState(null, '', location.href);
	// 2=> history.back()
}
