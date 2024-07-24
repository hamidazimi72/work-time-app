export class MediaAPI {
	//----------* Get User Media - Access To Stream *----------//
	static getUserMedia = (streamOptions?: MediaStreamConstraints) =>
		new Promise((resolve: (value: MediaStream) => void, reject) => {
			if (!navigator?.mediaDevices?.getUserMedia) return reject('[Media] - getUserMedia Method Not Support');

			navigator.mediaDevices
				.getUserMedia(streamOptions)
				.then((stream) => resolve(stream))
				.catch((err) => reject(err));
		});

	//----------* Get Display Media - Access To Stream *----------//
	static getDisplayMedia = (streamOptions?: DisplayMediaStreamOptions) =>
		new Promise((resolve: (value: MediaStream) => void, reject) => {
			if (!navigator?.mediaDevices?.getDisplayMedia) return reject('[Media] - getDisplayMedia Method Not Support');

			navigator.mediaDevices
				.getDisplayMedia(streamOptions)
				.then((stream) => resolve(stream))
				.catch((err) => reject(err));
		});

	//----------* Open Stream & Get MediaRecorder *----------//
	static recordMedia = async (streamOptions?: MediaStreamConstraints, recorderOptions?: MediaRecorderOptions) =>
		new Promise((resolve: (result: { recorder: MediaRecorder; stream: MediaStream }) => void, reject) => {
			this.getUserMedia(streamOptions)
				.then((stream) => {
					const recorder = new MediaRecorder(stream, recorderOptions);

					resolve({ recorder, stream });
				})
				.catch((error) => {
					reject(error);
				});
		});
}

// ___________________________ GetUserMedia ___________________________//
// Navigators.mediaDevices
// 	.getUserMedia({ video: true, audio: false })
// 	.then((stream) => {
// 		const mediaEl = document.createElement('video');
// 		mediaEl.autoplay = true;
// 		mediaEl.style.minHeight = '150px';
// 		mediaEl.srcObject = stream;
// 		document.body.appendChild(mediaEl);
// 		// Capture && Stop
// 		setTimeout(() => {
// 			const canvasEl = document.createElement('canvas');
// 			var context = canvasEl.getContext('2d');
// 			canvasEl.style.minHeight = '150px';
// 			mediaEl.style.display = 'none';
// 			document.body.appendChild(canvasEl);
// 			context.drawImage(mediaEl, 0, 0, canvasEl.width, mediaEl.videoHeight / (mediaEl.videoWidth / canvasEl.width));
// 			mediaEl.srcObject.getVideoTracks().forEach((track) => track.stop());
// 		}, 10000);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
