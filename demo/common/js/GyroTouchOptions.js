function GyroTouchOptions(container, panoViewer, options) {
	if (!panoViewer || !container) {
		console.warn("invalid param: ", container, panoViewer);
		return;
	}

	var controlStatus = {
		gyro: 1, /* 2 way */
		touch: 3 /* all */
	};

	_initHTML(container, options.enableGyroOption, options.enableTouchOption);
	_updateOptionButtonsByStatus();
	_initHandler();

	function _initHTML(target, enableGyroOption, enableTouchOption) {
		/**
		 *
		 *<div class="gyroTouchOptions">
				<div class="optionSet gyro">
						<div class="selectGroup hide">
								<div class="option gyro-none">NONE</div>
								<div class="option gyro-yawpitch">2 WAY</div>
								<div class="option gyro-vr">3 WAY</div>
						</div>
						<div class="option statusButton">GYR</div>
				</div>
				<div class="optionSet touch">
						<div class="selectGroup hide">
								<div class="option touch-none">NONE</div>
								<div class="option touch-yaw">YAW</div>
								<div class="option touch-pitch">PITCH</div>
								<div class="option touch-all">ALL</div>
						</div>
						<div class="option statusButton">TCH</div>
				</div>
		</div>
		 */
		let elOptions = document.createElement("div");
		elOptions.className = "gyroTouchOptions"

		enableGyroOption && _initGyroControlHTML(elOptions);
		enableTouchOption && _initTouchControlHTML(elOptions);

		target.appendChild(elOptions);
	}

	function _initGyroControlHTML(container) {
		var optionHTML = '\
			<div class="optionSet gyro">\
				<div class="selectGroup hide">\
					<div class="option gyro-none">NONE</div>\
					<div class="option gyro-yawpitch">2 WAY</div>\
					<div class="option gyro-vr">3 WAY</div>\
				</div>\
				<div class="option statusButton">GYR</div>\
			</div>';

		container.insertAdjacentHTML("beforeend", optionHTML);
	}

	function _initTouchControlHTML(container) {
		var optionHTML = '\
			<div class="optionSet touch">\
				<div class="selectGroup hide">\
						<div class="option touch-none">NONE</div>\
						<div class="option touch-yaw">YAW</div>\
						<div class="option touch-pitch">PITCH</div>\
						<div class="option touch-all">ALL</div>\
				</div>\
				<div class="option statusButton">TCH</div>\
			</div>';

		container.insertAdjacentHTML("beforeend", optionHTML);
	}

	function _updateOptionButtonsByStatus() {
		var gyroTouchOptions = document.querySelector('.gyroTouchOptions');
		var gyroOptions = gyroTouchOptions.querySelectorAll('.gyro .selectGroup .option');
		var touchOptions = gyroTouchOptions.querySelectorAll('.touch .selectGroup .option');

		function setSelected(option, index, newIndex) {
			if (index === newIndex) {
				option.classList.add("selected");
			} else {
				option.classList.remove("selected");
			}
		}

		// update option button by current status
		gyroOptions.forEach(function(opt, i) {
			setSelected(opt, i, controlStatus.gyro)
		});

		touchOptions.forEach(function(opt, i) {
			setSelected(opt, i, controlStatus.touch)
		});
	};

	function _initHandler() {
		var gyroTouchOptions = document.querySelector('.gyroTouchOptions');
		var statusButton = gyroTouchOptions.querySelectorAll('.statusButton');

		statusButton.forEach(function(button) {
			button.addEventListener("click", function(e) {
				var group = e.target.parentNode.querySelector(".selectGroup");
				var classList = group.classList;
				if (classList.contains("hide")) {
					classList.remove("hide");
				} else {
					classList.add("hide");
				}
			});
		});

		var items = gyroTouchOptions.querySelectorAll('.selectGroup .option');
		items.forEach(function(item) {
			item.addEventListener("click", function(e) {
				e.target.parentNode.classList.add("hide");

				var selected = e.target.parentNode.querySelector(".selected");

				// Already selected
				if (selected === e.target) {
						return;
				}

				if (selected) {
						selected.classList.remove("selected");
				};

				var cls = e.target.classList;
				var touchDir = panoViewer.getTouchDirection();
				var gyroMode = panoViewer._yawPitchControl.option("gyroMode");

				if (cls.contains("gyro-none")) {
						controlStatus.gyro = 0;
						gyroMode = eg.view360.PanoViewer.GYRO_MODE.NONE;
				} else if (cls.contains("gyro-yawpitch")) {
						controlStatus.gyro = 1;
						gyroMode = eg.view360.PanoViewer.GYRO_MODE.YAWPITCH;
				} else if (cls.contains("gyro-vr")) {
						controlStatus.gyro = 2;
						gyroMode = eg.view360.PanoViewer.GYRO_MODE.VR;
				} else if (cls.contains("touch-none")) {
						controlStatus.touch = 0;
						touchDir = eg.view360.PanoViewer.TOUCH_DIRECTION.NONE;
				} else if (cls.contains("touch-yaw")) {
						controlStatus.touch = 1;
						touchDir = eg.view360.PanoViewer.TOUCH_DIRECTION.YAW;
				} else if (cls.contains("touch-pitch")) {
						controlStatus.touch = 2;
						touchDir = eg.view360.PanoViewer.TOUCH_DIRECTION.PITCH;
				} else if (cls.contains("touch-all")) {
						controlStatus.touch = 3;
						touchDir = eg.view360.PanoViewer.TOUCH_DIRECTION.ALL;
				}

				panoViewer.setGyroMode(gyroMode);
				panoViewer.setTouchDirection(touchDir);

				cls.add("selected");
			});
		});
	}
}
