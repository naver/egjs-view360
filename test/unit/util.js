const resemble = window.resemble;

function getImageBlob(path, callback) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", path, true);
	if (window.URL) {
		xhr.responseType = "blob";
	} else {
		xhr.responseType = "arraybuffer";
	}
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState !== 4 || xhr.status !== 200) {
			return;
		}
		callback(this.response);
	};
	xhr.send();
}

function compare(path, canvas, callback) {
	getImageBlob(path, reference => {
		canvas.toBlob(canvasData => {
			resemble(reference)
				.compareTo(canvasData)
				.onComplete(data => {
					const pct = parseFloat(data.misMatchPercentage);

					callback(pct);
				}
			);		
		}, "image/png");
	});
}
