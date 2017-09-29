const YawPitch = eg.YawPitch;
const DeviceOrientationControls = YawPitch.DeviceOrientationControls;
const deviceOrientationControls = new DeviceOrientationControls();

deviceOrientationControls.on("change", e => {
	document.querySelector("#content").innerHTML = JSON.stringify(e);
});

const enableBtn = document.getElementById("enableBtn");
const disableBtn = document.getElementById("disableBtn");
const vrBtn = document.getElementById("vrBtn");
const yawpitchBtn = document.getElementById("yawpitchBtn");

enableBtn.addEventListener("click", function() {
	deviceOrientationControls.enable();
});
disableBtn.addEventListener("click", function() {
	deviceOrientationControls.disable();
});
vrBtn.addEventListener("click", e => {
	deviceOrientationControls.option("controlMode", YawPitch.CONTROL_MODE_VR);
	e.target.classList.add("pure-button-primary");
});
yawpitchBtn.addEventListener("click", e => {
	deviceOrientationControls.option("controlMode", YawPitch.CONTROL_MODE_YAWPITCH);
	e.target.classList.add("pure-button-primary");
});
