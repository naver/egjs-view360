// Three js 롤 360 파노라마 보여주고
// 카메라 방향 설정을 yaw, pitch 로 할 수 있는 컴포넌트
(function(global, THREE) {
	const WIDTH = 300;

	function ThreePanoView(container, image, yaw, pitch, fov, aspect) {
		this._yaw = yaw;
		this._pitch = pitch;
		this._fov = fov;

		this._camera = new THREE.PerspectiveCamera(65, aspect, 1, 1100);
		const geometry = new THREE.SphereGeometry(500, 60, 40);

		this.material = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(image, () => {
				this.render(yaw, pitch, fov);
			}),
		});

		this._scene = new THREE.Scene();
		this._renderer = new THREE.WebGLRenderer();
		this._camera.target = new THREE.Vector3(0, 0, 0);

		geometry.scale(-1, 1, 1);
		this._scene.add(new THREE.Mesh(geometry, this.material));
		this._renderer.setPixelRatio(global.devicePixelRatio);
		this._renderer.setSize(WIDTH, WIDTH / aspect);
		container.appendChild(this._renderer.domElement);
	}

	ThreePanoView.prototype.setAspectRatio = function(aspect) {
		this._camera.aspect = aspect;
		this._camera.updateProjectionMatrix();
		if (aspect >= 1) {
			this._renderer.setSize(WIDTH, WIDTH / aspect);
		} else {
			this._renderer.setSize(WIDTH * aspect, WIDTH);
		}
		this._renderer.render(this._scene, this._camera);
	};

	ThreePanoView.prototype.setImage = function(image) {
		THREE.TextureLoader.prototype.crossOrigin = "";
		this.material.map = new THREE.TextureLoader().load(image, () => {
			this.render(this._yaw, this._pitch, this._fov);
		});
	};

	ThreePanoView.prototype.render = function(yaw, pitch, fov) {
		if (yaw) {
			this._yaw = yaw;
		}
		if (pitch) {
			this._pitch = pitch;
		}
		if (fov) {
			this._fov = fov;
			this._camera.fov = fov;
			this._camera.updateProjectionMatrix();
		}

		const theta = THREE.Math.degToRad(-this._yaw + 180);
		const phi = THREE.Math.degToRad(90 - this._pitch);

		this._camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
		this._camera.target.y = 500 * Math.cos(phi);
		this._camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
		this._camera.lookAt(this._camera.target);
		this._renderer.render(this._scene, this._camera);
	};

	global.ThreePanoView = ThreePanoView;
})(window, window.THREE);
