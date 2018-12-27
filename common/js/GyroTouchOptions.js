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
				<div class="option statusButton"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 224 224" style=" fill:#000000;"><g transform="translate(22.4,22.4) scale(0.8,0.8)"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g id="original-icon" fill="#ffffff"><path d="M197.86667,14.93333c-6.18559,0 -11.2,5.01441 -11.2,11.2c0.00413,0.20439 0.01385,0.40864 0.02916,0.6125l-16.90208,16.90208c-15.61777,-13.22599 -35.77892,-21.24792 -57.79375,-21.24792c-49.39627,0 -89.6,40.20373 -89.6,89.6c0,22.01482 8.02193,42.17598 21.24792,57.79375l-16.90208,16.90208c-0.20386,-0.01531 -0.40811,-0.02504 -0.6125,-0.02916c-6.18559,0 -11.2,5.01441 -11.2,11.2c0,6.18559 5.01441,11.2 11.2,11.2c6.18559,0 11.2,-5.01441 11.2,-11.2c-0.00413,-0.20439 -0.01386,-0.40864 -0.02917,-0.6125l16.90208,-16.90208c15.61777,13.22599 35.77893,21.24792 57.79375,21.24792c49.39627,0 89.6,-40.20373 89.6,-89.6c0,-22.01482 -8.02193,-42.17598 -21.24792,-57.79375l16.90208,-16.90208c0.20386,0.01531 0.4081,0.02504 0.6125,0.02917c6.18559,0 11.2,-5.01441 11.2,-11.2c0,-6.18559 -5.01441,-11.2 -11.2,-11.2zM112,37.33333c13.17723,0 25.52266,3.41934 36.25417,9.37708c-4.14549,1.21774 -8.4353,2.93117 -12.93542,5.17708c-7.92322,3.95431 -16.43822,9.49993 -25.12709,16.20208c-3.70969,-2.03774 -7.39765,-3.84161 -11.01041,-5.1625c-12.12885,-4.43452 -24.79307,-5.10305 -33.075,3.17917c-8.28193,8.28221 -7.61411,20.9463 -3.17917,33.075c1.31998,3.60989 3.12676,7.30373 5.1625,11.01041c-6.70185,8.6891 -12.24805,17.21831 -16.20208,25.14167c-2.24576,4.5002 -3.95928,8.77962 -5.17708,12.92084c-5.95774,-10.73151 -9.37708,-23.07694 -9.37708,-36.25417c0,-41.3257 33.34097,-74.66667 74.66667,-74.66667zM157.68959,59.85c3.8165,-0.44765 5.19417,0.30878 5.67291,0.7875c0.47876,0.47872 1.23501,1.85641 0.7875,5.67292c-0.44748,3.81651 -2.23848,9.35015 -5.39583,15.67709c-2.81813,5.64716 -6.83305,11.99082 -11.60834,18.56458c-3.29853,-4.30521 -6.87076,-8.57715 -10.99583,-12.70208c-4.12507,-4.12493 -8.39676,-7.69745 -12.70208,-10.99583c6.5736,-4.77552 12.91752,-8.79001 18.56458,-11.60834c6.32682,-3.15757 11.8606,-4.94819 15.67709,-5.39583zM82.62916,74.71041c2.90627,-0.09278 6.73176,0.51226 11.43333,2.23126c1.1394,0.41658 2.38998,1.08528 3.5875,1.61874c-3.29377,2.95305 -6.59242,5.96524 -9.85834,9.23125c-3.2659,3.26603 -6.27831,6.56447 -9.23125,9.85834c-0.5335,-1.1975 -1.20213,-2.44812 -1.61874,-3.5875c-3.43829,-9.40303 -2.41645,-15.25848 -0.27709,-17.39792c1.06968,-1.06972 3.05832,-1.86138 5.96458,-1.95417zM177.28959,75.74583c5.95774,10.73151 9.37708,23.07694 9.37708,36.25417c0,41.3257 -33.34097,74.66667 -74.66667,74.66667c-13.17723,0 -25.52266,-3.41935 -36.25417,-9.37708c4.14549,-1.21774 8.4353,-2.93117 12.93542,-5.17709c7.92322,-3.95432 16.43822,-9.49992 25.12709,-16.20208c3.70969,2.03774 7.39764,3.84161 11.01041,5.16251c12.12886,4.43453 24.79307,5.10305 33.075,-3.17917c8.28194,-8.28222 7.61413,-20.94628 3.17917,-33.075c-1.31999,-3.60989 -3.12676,-7.30373 -5.16251,-11.01041c6.70186,-8.6891 12.24805,-17.21831 16.20208,-25.14167c2.24576,-4.5002 3.95928,-8.77962 5.17709,-12.92084zM111.3,86.43542c4.78102,3.37623 9.6339,7.31531 14.29166,11.97292c4.65777,4.65759 8.59652,9.51076 11.97292,14.29166c-3.68845,4.31875 -7.61696,8.65222 -11.91458,12.95c-4.29763,4.29778 -8.63138,8.22598 -12.95,11.91458c-4.78102,-3.37623 -9.6339,-7.3153 -14.29166,-11.97292c-4.65778,-4.6576 -8.59652,-9.51076 -11.97292,-14.29166c3.68845,-4.31875 7.61696,-8.65222 11.91458,-12.95c4.29763,-4.29778 8.63138,-8.22598 12.95,-11.91458zM112,104.53333c-4.12373,0 -7.46667,3.34294 -7.46667,7.46667c0,4.12373 3.34294,7.46667 7.46667,7.46667c4.12373,0 7.46667,-3.34294 7.46667,-7.46667c0,-4.12373 -3.34294,-7.46667 -7.46667,-7.46667zM76.85417,123.44792c3.29853,4.30521 6.87076,8.57715 10.99583,12.70208c4.12507,4.12493 8.39677,7.69745 12.70208,10.99583c-6.5736,4.77552 -12.91752,8.79001 -18.56458,11.60834c-6.32682,3.15758 -11.86059,4.94819 -15.67709,5.39583c-3.81649,0.44763 -5.19418,-0.30875 -5.67292,-0.7875c-0.47874,-0.47869 -1.23501,-1.85641 -0.7875,-5.67291c0.44751,-3.8165 2.23848,-9.35016 5.39583,-15.67709c2.81813,-5.64716 6.83304,-11.99082 11.60834,-18.56458zM145.43959,126.35c0.5335,1.1975 1.20213,2.44812 1.61874,3.5875c3.43829,9.40303 2.41645,15.25847 0.27709,17.39792c-2.13936,2.13944 -7.99476,3.16089 -17.39792,-0.27709c-1.1394,-0.41658 -2.38998,-1.08528 -3.5875,-1.61874c3.29377,-2.95305 6.59242,-5.96523 9.85834,-9.23125c3.26591,-3.26603 6.27831,-6.56447 9.23125,-9.85834z"></path></g></g></g></svg></div>\
			</div>';

		container.insertAdjacentHTML("beforeend", optionHTML);
	}

	function _initTouchControlHTML(container) {
		var optionHTML = '\
			<div class="optionSet touch">\
				<div class="selectGroup hide">\
						<div class="option touch-none">DISABLE</div>\
						<div class="option touch-yaw"><span></span></div>\
						<div class="option touch-pitch"><span class="vertical"></span></div>\
						<div class="option touch-all"><span></span><span class="vertical"></span></div>\
				</div>\
				<div class="option statusButton">\
				<svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#fff" id="icon-24-one-finger-tap"><path d="M16,8.94949144 C16.6185935,8.3182229 17,7.4536526 17,6.5 C17,4.56700328 15.4329967,3 13.5,3 C11.5670033,3 10,4.56700328 10,6.5 C10,7.4536526 10.3814065,8.3182229 11,8.94949144 L11,6.50098635 C11,5.12893087 12.1192881,4 13.5,4 C14.8903379,4 16,5.11972973 16,6.50098635 L16,8.94949144 L16,8.94949144 Z M19,11.4908981 C19,10.6674978 18.3342028,10 17.5,10 C16.6715729,10 16,10.6762201 16,11.4908981 L16,13.4325233 L16,16 L15,16 L15,13.5 L15,6.50863659 C15,5.67543961 14.3342028,5 13.5,5 C12.6715729,5 12,5.66642015 12,6.50863659 L12,16.7983451 C9.94160039,14.5979243 7.23162978,12.1791206 6.12103271,13.2957153 C5.03386293,14.3887562 7.83536199,17.4007216 11.7473755,23.9830936 C13.5099958,26.9488875 15.7402849,28.9995418 19.5,29 C23.6421358,29 27,25.6421358 27,21.5 L27,18.2468012 L27,13.5063976 C27,12.6744372 26.3342028,12 25.5,12 C24.6715729,12 24,12.6764628 24,13.5063976 L24,15.7497253 L24,16 L23,16 L23,13.6781559 L23,12.4912653 C23,11.6676622 22.3342028,11 21.5,11 C20.6715729,11 20,11.6625444 20,12.4912653 L20,13.5082011 L20,15 L19,15 L19,13.5082011 L19,11.4908981 L19,11.4908981 Z" id="one-finger-tap"/></g></g></svg>\
				</div>\
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
				var group = e.currentTarget.parentNode.querySelector(".selectGroup");
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
				e.currentTarget.parentNode.classList.add("hide");

				var selected = e.currentTarget.parentNode.querySelector(".selected");

				// Already selected
				if (selected === e.currentTarget) {
						return;
				}

				if (selected) {
						selected.classList.remove("selected");
				};

				var cls = e.currentTarget.classList;
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
