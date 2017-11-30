// YawPitch 에서 현재 좌표의 위치와, 이동가능한 영역의 범위를 시각화 해서 보여준다.
// Yaw Pitch
// Fov 영억과 값도 시각화
// 특정 위치를 클릭하면 그 영역으로 lookAt 을 이용해 이동하도록 한다.
(function(global) {
	function GridView(container, yaw, pitch, yawRange, pitchRange) {
		this.container = container;

		// state 는 yaw, pitch, raw range, pitch range 를 포함해야함
		this.canvas = document.createElement("canvas");
		this.container.appendChild(this.canvas);
		this.canvas.width = 600;
		this.canvas.height = 300;
		this.ctx = this.canvas.getContext("2d");

		this.render(yaw, pitch, yawRange, pitchRange);
	}

	GridView.prototype.render = function(yaw, pitch, yawRange, pitchRange) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// 배경 그리드 그리기
		this._renderGrid(yawRange, pitchRange);
		this._renderPoint(yaw, pitch);
	};

	GridView.prototype.onClick = function(callback) {
		this.canvas.addEventListener("click", function(e) {
			const yaw = e.layerX / 300 * 360 - 180;
			const pitch = 90 - e.layerY / 150 * 180;

			callback(yaw, pitch);
		});
	};

	GridView.prototype._renderGrid = function(yawRange, pitchRange) {
		var i;
		const ctx = this.ctx;
		const canvas = this.canvas;

		// 파란 그리드
		ctx.beginPath();
		ctx.lineWidth = 0.25;

		for (i = 0; i < 600; i += 10) {
			ctx.moveTo(0, i);
			ctx.lineTo(canvas.width, i);
		}
		for (i = 0; i < 600; i += 10) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, canvas.height);
		}

		ctx.strokeStyle = "#0000ff";
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.closePath();

		// 빨간 그리드
		ctx.beginPath();
		ctx.lineWidth = 0.5;

		ctx.moveTo(0, canvas.height / 2);
		ctx.lineTo(canvas.width, canvas.height / 2);

		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, canvas.height);

		ctx.moveTo(canvas.width * 3 / 4, 0);
		ctx.lineTo(canvas.width * 3 / 4, canvas.height);

		ctx.moveTo(canvas.width * 1 / 4, 0);
		ctx.lineTo(canvas.width * 1 / 4, canvas.height);

		ctx.strokeStyle = "#ff0000";
		ctx.stroke();
		ctx.closePath();

		// Yaw 영역 그리드
		if (yawRange) {
			ctx.beginPath();
			ctx.lineWidth = 300;

			ctx.moveTo(0, canvas.height / 2);
			ctx.lineTo((yawRange[0] + 180) / 180 * 300, canvas.height / 2);

			ctx.moveTo(600 - (180 - yawRange[1]) / 180 * 300, canvas.height / 2);
			ctx.lineTo(600, canvas.height / 2);

			ctx.strokeStyle = "rgba(255,255,255,.8)";
			ctx.stroke();
			ctx.closePath();
		}

		// Pitch 영역 그리드
		if (pitchRange) {
			ctx.beginPath();
			ctx.lineWidth = 600 - ((yawRange[0] + 180) + (180 - yawRange[1])) / 180 * 300;

			ctx.moveTo(canvas.width / 2, 0);
			ctx.lineTo(canvas.width / 2, (pitchRange[0] + 90) / 90 * 150);

			ctx.moveTo(canvas.width / 2, 300 - (90 - pitchRange[1]) / 90 * 150);
			ctx.lineTo(canvas.width / 2, 300);

			ctx.strokeStyle = "rgba(255,255,255,.8)";
			ctx.stroke();
			ctx.closePath();
		}
	};

	GridView.prototype._renderPoint = function(yaw, pitch) {
		const ctx = this.ctx;

		ctx.beginPath();
		ctx.arc(
			((180 + yaw) / 360) * 600,
			300 - ((90 + pitch) / 180) * 300,
			10, 0, 2 * Math.PI, false);
		ctx.fillStyle = "red";
		ctx.fill();
	};

	global.GridView = GridView;
})(window);
