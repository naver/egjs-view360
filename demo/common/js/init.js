if (typeof navigator.getVRDisplays !== "function") {
    new WebXRPolyfill();
}
