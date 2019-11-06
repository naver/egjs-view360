// YawPitch 의 현재 상태값을 숫자로 표시하며 현재 옵션을 쉽게 설정해 볼 수 있도록 한다.
(function(global) {
	function OptionControls(container, yaw, pitch, fov, yawRange, pitchRange, fovRange) {
		this.container = container;

		// container 안에 있는 각종 Input 에 이벤트핸들러를 달아준다.
		// this.render(yaw, pitch, yawRange, pitchRange);
	}

	// 상태값을 input 의 외형과 숫자 값 표시에 반영한다.
	OptionControls.prototype.render = function(yaw, pitch, fov, yawRange, pitchRange, fovRange) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// 배경 그리드 그리기
		this._renderGrid(yawRange, pitchRange);
		this._renderPoint(yaw, pitch);
	};

	global.GridView = OptionControls;
})(window);
