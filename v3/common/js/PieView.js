function PieView(element, state, pieRadius) {
	this._$wrapper = $(element);
	this._diameter = parseInt(window.getComputedStyle(element).width);
	this._pieRadius = pieRadius || this._diameter / 2;

	var dir, fov, h;

	this.state = {};

	if (state) {
		dir = state.direction;
		fov = state.fov;
		h = state.horizontalAngleOfImage;
	}

	this.setState(dir, fov, h);

	this._updateNavigator(this._diameter);
	this._updateRangeCircle(this._diameter, this.state.horizontalAngleOfImage);
}

PieView.prototype.setState = function(direction, fov, horizontalAngleOfImage) {
	this.state.direction = direction || this.state.direction || 0;
	this.state.fov = fov || this.state.fov || 0;

	if (horizontalAngleOfImage && horizontalAngleOfImage !== this.state.horizontalAngleOfImage) {
		this.state.horizontalAngleOfImage = horizontalAngleOfImage;
		this._updateRangeCircle(this._diameter, horizontalAngleOfImage);
	}

	this.render(this.state);
};

PieView.prototype.render = function(state) {
	if (!this._pie) {
		// if not init
		return;
	}

	var radius = this._pieRadius;
	var r = (state.fov * Math.PI / 180);
	var x = Math.sin(r) * radius;
	var y = Math.cos(r) * radius * -1;
	var mid = (state.fov > 180) ? 1 : 0;
	var anim = "M 0 0 v -" + radius + " A " + radius + " " + radius + " 1 " + mid + " 1 " + x + " " + y + " z";

	this._pie.setAttribute("d", anim);

	this._$navigator.css({
		transform: "rotateZ(" + (-state.direction - state.fov / 2) + "deg)"
	});
};

PieView.prototype.destroy = function() {
	this._$wrapper.empty();
};

PieView.prototype._updateRangeCircle = function(diameter, yawRangeSize) {
	// Navigator Background (Show limit)
	var horizontalAngleOfImage = (yawRangeSize || 360) / 360;// * 0.878; // 0.88
	var rangeRadius = diameter / 2 - 1.5;
	var lineLength = 2 * Math.PI * rangeRadius * horizontalAngleOfImage;
	var emptyLength = 2 * Math.PI * rangeRadius * (1 - horizontalAngleOfImage);
	var $range = this._$wrapper.find(".range");

	if (!$range.hasClass("range")) {
		this._$wrapper.append("<svg class='nav'><circle class='range'></circle></svg>");
		$range = this._$wrapper.find(".range");
	}

	var navSvg = this._$wrapper.find("svg.nav")[0];
	var navCircle = this._$wrapper.find("circle.range")[0];

	navSvg.setAttribute("width", diameter);
	navSvg.setAttribute("height", diameter);
	navSvg.setAttribute("viewbox", "0 0 " + diameter + " " + diameter);

	navCircle.setAttribute("cx", diameter / 2);
	navCircle.setAttribute("cy", diameter / 2);
	navCircle.setAttribute("r", rangeRadius);
	navCircle.setAttribute("stroke", "rgba(255, 255, 255, 0.8)");
	navCircle.setAttribute("stroke-dasharray", lineLength + ", " + emptyLength);
	navCircle.setAttribute("stroke-width", 2);
	navCircle.setAttribute("fill", "none");

	$range.css("stroke-dashoffset", "-" + (2 * Math.PI * rangeRadius / 4 + emptyLength / 2));

	$(this._pie).css({
		fill: "rgba(255,255,255,.8)" // set pie color
	});
};

PieView.prototype._updateNavigator = function(diameter) {
	// Navigator
	var pieSvg;
	var piePath;

	this._$navigator = this._$wrapper.find(".pie");

	if (!this._$navigator.hasClass("pie")) {
		this._$wrapper.append(
			'<div class="pie">' +
				'<svg><path class="inner-pie"/></svg>' +
			'</div>'
		);

		this._$navigator = this._$wrapper.find(".pie");
	}

	this._pie = this._$wrapper.find(".inner-pie")[0];

	pieSvg = this._$navigator.find("svg");
	piePath = this._$navigator.find("path");

	pieSvg.css({
		width: diameter,
		height: diameter,
	});

	pieSvg[0].setAttribute("viewbox", "0 0 " + diameter + " " + diameter);
	piePath[0].setAttribute("transform", "translate(" + diameter / 2 + ", " + diameter / 2 + ")");

	this._$navigator.css("position", "absolute");
};
