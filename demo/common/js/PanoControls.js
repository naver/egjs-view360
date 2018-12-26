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
					fullscreenContainer.appendChild(rootNode);
					fullscreenContainer.style.display = "block";
				} else {
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
	}

	function _initControlHTML(target) {
		var svg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\
		<g>\
			<path d="M30,5 L5,5 L5,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M70,5 L95,5 L95,30" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M30,95 L5,95 L5,65" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
			<path d="M70,95 L95,95 L95,65" fill="transparent" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>\
		</g>\
		</svg>';
		var controls = '\
			<div class="image360_loading"><div class="image360_loadingBar"></div></div>\
			<div class="panoviewer-control">\
				<button class="enterfs">' + svg + '</button>\
				<button class="exitfs">' + svg + '</button>\
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
