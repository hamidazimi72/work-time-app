export class ClipboardApi {
	//----------* Copy *----------//
	static writeText = (text: string) =>
		new Promise((resolve: (result: boolean) => any) => {
			try {
				if (navigator?.clipboard) {
					navigator.clipboard
						.writeText(text)
						.then(() => {
							resolve(true);
						})
						.catch(() => resolve(false));
				} else {
					const textField = document.createElement('textarea');

					textField.value = text;
					textField.className = 'opacity-0';
					document.body.appendChild(textField);
					textField.select();
					document.execCommand('copy');
					textField.remove();

					resolve(true);
				}
			} catch (error) {
				resolve(false);
			}
		});
}
