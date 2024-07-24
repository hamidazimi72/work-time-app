type ReadAs = 'binaryString' | 'text' | 'dataURL' | 'base64';

export class FileAPI {
	//----------* Create File *----------//
	static CreateFile = class CreateFile {
		file: File;

		constructor(data: (BlobPart | string)[], filename: string, options?: FilePropertyBag | undefined) {
			this.file = new File(data, filename, options);
		}

		readFile = async (readAs?: ReadAs) => await FileAPI._readFile(this.file, readAs);
		download = (filename?: string) => FileAPI._downloadFile(this.file, filename);
		showInNewTab = () => FileAPI._showFileInNewTab(this.file);
		getUrl = () => FileAPI._getFileUrl(this.file);
	};

	//----------* Read File *----------//
	static _readFile = (file: any, readAs: ReadAs = 'dataURL') =>
		new Promise((resolve: (result: string) => any) => {
			try {
				const reader = new FileReader();

				reader.onload = () => {
					const result = (reader.result || '').toString();
					if (readAs === 'base64') return resolve(this._trimDataUlrToBase64(result));
					else return resolve(result);
				};

				if (readAs === 'binaryString') reader.readAsBinaryString(file);
				if (readAs === 'text') reader.readAsText(file);
				if (readAs === 'dataURL' || readAs === 'base64') reader.readAsDataURL(file);
			} catch (error) {
				resolve('');
			}
		});

	//----------* File Url *----------//
	static _getFileUrl = (file: any) => URL.createObjectURL(file);
	static _destroyFileUrl = (url: string) => URL.revokeObjectURL(url);

	//----------* File Trim *----------//
	static _trimDataUlrToBase64 = (dataUrl: string) => dataUrl?.replace(/^data:[a-zA-Z]{2,10}\/[a-z]+;base64,/, '') || '';
	static _trimBase64ToDataUrl = (base64: string, contentType: string) => `data:${contentType || ''};base64,/${base64 || ''}`;

	//----------* Show File In New Tab *----------//
	static _showFileInNewTab = (file: any) => {
		const link = document.createElement('a');
		link.setAttribute('target', '_blank');
		link.href = this._getFileUrl(file);
		link.click();

		this._destroyFileUrl(link.href);
	};

	//----------* Show File In New Tab *----------//
	static _downloadFile = (file: any, filename?: string) => {
		const link = document.createElement('a');
		link.setAttribute('target', '_blank');
		link.href = this._getFileUrl(file);
		link.download = filename || file?.name || 'file';
		link.click();

		this._destroyFileUrl(link.href);
	};
}
