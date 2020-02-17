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

		var vrButton = document.querySelector(".entervr")
		vrButton && vrButton.addEventListener("click", function() {
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
				text: "This website needs a permission to access Device motion & Orientation for the immersive experience.",
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
						text: "This website requires a permission for your device motion sensor for the immersive experience.",
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

	function isMobile() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};

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
		var controls = isMobile()
			? '\
			<div class="image360_loading"><div class="image360_loadingBar"></div></div>\
			<div class="panoviewer-control">\
				<button class="entervr">' + vrSvg + '</button>\
				<button class="enterfs">' + fullscreenSvg + '</button>\
				<button class="exitfs">' + cancelFullscreenSvg + '</button>\
				<div class="camera"></div>\
			</div>'
			: '\
			<div class="image360_loading"><div class="image360_loadingBar"></div></div>\
			<div class="panoviewer-control">\
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
