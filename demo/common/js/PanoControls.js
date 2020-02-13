var PanoControls = (function() {
	/**
	 * 1. Direction Navigator
	 * 2. Full Screen
	 *
	 * @param {HTMLElement} target
	 */
	function init(target, panoViewer, options) {
		if (!PieView) {
			console.warn("PieView is not initialized.");
			return;
		};

		if (options && (options.enableTouchOption || options.enableGyroOption)) {
			GyroTouchOptions(target, panoViewer, options);
		}

		_initControlHTML(target);

		/**
		 * Navigator Handler
		 */
		var pieEl = document.querySelector(".camera");
		var pieView = new PieView(pieEl);
		panoViewer.on({
			"ready": function () {
				var yawRange = panoViewer.getYawRange();
				pieView.setState(panoViewer.getYaw(), panoViewer._getHFov(), yawRange[1] - yawRange[0]);
				showLoading(false);
			},
			"viewChange": function (e) {
					var hfov = panoViewer._getHFov();
					pieView.setState(e.yaw,  hfov);
					// console.log("viewChange");
			}
		});

		/**
		 * When clicking on pie, set to default direction.
		 */
		pieEl.addEventListener("click", function() {
			panoViewer.lookAt({yaw: 0, pitch: 0}, 400);
		});

		/**
		 * Resize Handler
		 */
		window.addEventListener("resize", debounce(function() {
			panoViewer.updateViewportDimensions();

			var yaw = panoViewer.getYaw();
			var hfov = panoViewer._getHFov();
			pieView.setState(yaw,  hfov);
		}));

		/**
		 * Full Screen Handler
		 */
		var originalContainer = target.parentElement;
		var nextElementSibling = target.nextElementSibling;
		var fullscreenContainer = document.getElementsByClassName("fullscreen-container")[0];

		function changeMode(mode) {
			var rootNode = target.parentNode.removeChild(target);
			var requestFullscreen;

			if (screenfull.enabled) {
				requestFullscreen = screenfull.isFullscreen;
			} else {
				requestFullscreen = mode === "full";
			}

			if (requestFullscreen) {
				document.body.style.overflow = "hidden";
				fullscreenContainer.appendChild(rootNode);
				fullscreenContainer.style.display = "block";
			} else {
				document.body.style.overflow = "initial";
				originalContainer.insertBefore(rootNode, nextElementSibling);
				fullscreenContainer.style.display = "none";
			}

			// resize event is not triggered.
			panoViewer.updateViewportDimensions();
		}

		screenfull.enabled && screenfull.on("change", changeMode);

		document.querySelector(".enterfs").addEventListener("click", function() {
			if (screenfull.enabled) {
				screenfull.request();
			} else {
				changeMode("full");
			}
		});

		document.querySelector(".exitfs").addEventListener("click", function() {
			if (screenfull.enabled) {
				screenfull.exit();
			} else {
				changeMode("orignal");
			}
		});

		document.querySelector(".entervr").addEventListener("click", function() {
			panoViewer.enterVR().catch(e => {
				Swal.fire({
					title: "Can't enter VR mode!",
					text: e.message || e,
					icon: "error"
				});
			});
		});

		// For iOS 13+
		panoViewer.enableSensor().catch(() => {
			Swal.fire({
				title: "Permission needed! (iOS13+)",
				icon: "question",
				text: "Please give me a permission to access Device motion & Orientation :3",
				showCancelButton: true,
				reverseButtons: true,
				confirmButtonText: "Allow",
				cancelButtonText: "Deny"
			}).then(result => {
				if (result.value) {
					// Granted
					panoViewer.enableSensor().catch(() => {
						Swal.fire(
							"You've denied a permission!",
							"You have to completely close out your browser and reconnect this page to enable sensor again!",
							"error"
						);
					});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					// User dismissed
				}
			});
		});

		const iOSVersion = (() => {
			if (/iP(hone|od|ad)/.test(navigator.platform)) {
				// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
				var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
				return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			}
		})();

		// For iOS 12.2 ~ 13
		if (iOSVersion && iOSVersion[0] === 12 && iOSVersion[1] >= 2) {
			PanoViewer.isGyroSensorAvailable(available => {
				if (!available) {
					Swal.fire({
						title: "Please enable the Motion Sensor! (iOS12.2~13)",
						icon: "warning",
						text: "This website requires a permission for your device sensor.",
						html: `
						<div style="text-align: left;">
							<div>
							1. Open <img src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Settings_2x.png" width="20" /> <b>Settings</b>
							</div>
							<div>
							2. Select <img src="https://km.support.apple.com/resources/sites/APPLE/content/live/IMAGES/0/IM26/en_US/safari-240.png" width="20" /> <b>Safari</b>
							</div>
							<div>
							3. Enable <b>Motion & Orientation Access</b>
							</div>
							<div>4. Reload the page</div>
						</div>
						`
					});
				}
			});
		}
	}

	function _initControlHTML(target) {
		var fullscreenSvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\
		<g>\
			<path d="M30,5 L5,5 L5,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M70,5 L95,5 L95,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M30,95 L5,95 L5,65" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M70,95 L95,95 L95,65" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
		</g>\
		</svg>';
		var vrSvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\
		<g>\
			<path d="M5,30 L95,30 L95,80 L55,80 L50,70 L45,80 L5,80 L5,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M5,30 L15,10 L85,10 L95,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<circle cx="30" cy="55" r="10" stroke="#fff" stroke-width="8" fill="transparent" />\
			<circle cx="70" cy="55" r="10" stroke="#fff" stroke-width="8" fill="transparent" />\
		</g>\
		</svg>';
		var cancelFullscreenSvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\
		<g>\
			<path d="M30,5 L30,30 L5,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M70,5 L70,30 L95,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M30,95 L30,65 L5,65" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M70,95 L70,65 L95,65" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
		</g>\
		</svg>';
		var controls = '\
			<div class="image360_loading"><div class="image360_loadingBar"></div></div>\
			<div class="panoviewer-control">\
				<button class="entervr">' + vrSvg + '</button>\
				<button class="enterfs">' + fullscreenSvg + '</button>\
				<button class="exitfs">' + cancelFullscreenSvg + '</button>\
				<div class="camera"></div>\
			</div>';

		target.insertAdjacentHTML("beforeend", controls);
		target.insertAdjacentHTML("afterend", '<div class="fullscreen-container"></div>');
	}

	function showLoading(isVisible) {
		var loadingEl = document.querySelector(".image360_loading");

		if (!loadingEl){
			console.warn("loading layer does not exist.");
			return;
		}
		var visible = (isVisible == undefined || isVisible == true) ? true : false;
		var loadingClassList = loadingEl.classList;

		if (visible) {
			loadingClassList.add("is-loading");
		} else {
			loadingClassList.remove("is-loading");
		}
	}

	return {
		init: init,
		showLoading: showLoading
	}
})();

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
