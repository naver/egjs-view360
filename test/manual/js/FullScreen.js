var FullScreen = (function() {
	var container = document.getElementById("panoviewer-showcase");
	var originalWrapper = container.parentElement;;
	var fullscreenWrapper = document.getElementById("fullscreen-container");
	var fullscreenToggleIcon = document.querySelector("#fullscreen-toggle i");

	function request() {
		if (container.classList.contains("fullscreen")) {
			return;
		}
		// apply full size
		container.classList.add("fullscreen");
		fullscreenWrapper.classList.add("activate");
		// change wrapper
		container.remove();
		fullscreenWrapper.appendChild(container);
		// toggle icon
		fullscreenToggleIcon.classList.remove("expand");
		fullscreenToggleIcon.classList.add("compress");
	}

	function exit() {
		if (!container.classList.contains("fullscreen")) {
			return;
		}

		// remove full size css
		container.classList.remove("fullscreen");
		fullscreenWrapper.classList.remove("activate");
		// change wrapper
		container.remove();
		originalWrapper.appendChild(container);
		//toggle icon
		fullscreenToggleIcon.classList.remove("compress");
		fullscreenToggleIcon.classList.add("expand");
	}

	return {
		request: request,
		exit: exit
	}
})();
