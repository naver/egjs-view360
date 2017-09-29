"use strict";

/**
 * LogHelper
 *
 * Desktop : Enhance logging using native console
 * Mobile : Add log layer
 *
 * Usage : Load this file according your needs
 *         a) Script tag : <script src="THIS_FILE_URL"></script>
 *         b) Bookmarklet : javascript:(function(e){e.setAttribute("src","THIS_FILE_URL");document.getElementsByTagName("body")[0].appendChild(e);})(document.createElement("script"));void(0);
 *
 *         For automatic initialization put "THIS_FILE_URL?init" parameter at the end
 *
 * @date 2015-05-29
 * @author egjs team
 */
window.LogHelper = {
	/**
	 * Initialization
	 * @param {Object} options
	 * @param {Object} style Label text style
	 */
	init : function(options, style) {
		this.options = {
			alias : "log",	// alias name
			label : "log",	// label text
			info : true,	// to show info
			native : false,	// use native console.log instead of customized
			uncollapsedCount : 10  // max object members count to be shown in uncollapsed mode. Bigger than this will be shown in collapsed mode
		};

		// label text style
		this.style = {
			color : "white",
			bgcolor : "red",
			size : 12
		};

		this._setOption(this.options, options);
		this._setOption(this.style, style);

		this._on = true;
		this._count = 0;

		this._labelStyle = ( new Error() ).stack ? [
			"%c "+ this.options.label,
			"color:"+ this.style.color +";background-color:"+ this.style.bgcolor +";font-size:"+ this.style.size +"px;"
		] : [undefined,undefined];

		if( window[ this.options.alias ] ) {
			console.error("Alias name is already in use, try different one.");
		} else {
			var platform = navigator.platform, ua = navigator.userAgent;

			// /^(mac|win|linux|freebsd|hp|sun)/i.test(platform) && !(RegExp.$1 === "Linux" && /CrOS|Android/.test(ua)) && window.console ?
			// 	this._makeConsole() : this._makeConsoleLayer();
			this._makeConsoleLayer();
		}
	},

	/**
	 * Set options
	 */
	_setOption : function(def, value) {
		if(!value) { return; }

		for(var x in def) {
			if(value[x] && def[x] !== value[x]) {
				def[x] = value[x];
			}
		}
	},

	/**
	 * Trun on log output
	 */
	on : function() {
		this._on = true;
	},

	/**
	 * Turn off log output
	 */
	off : function() {
		this._on = false;
	},

	/**
	 * Build console functionality
	 */
	_makeConsole : function() {
		window[ this.options.alias ] = this.options.native ?
			Function.prototype.bind.call( console.log, console, this._labelStyle[0], this._labelStyle[1] ) : this._consoleWrapper().bind(this);
	},

	/**
	 * Console wrapper
	 */
	_consoleWrapper : function() {
		return this._consoleWrapper = this._labelStyle[0] ? function() {
			if( !this._on ) { return; }

			var buffer = this._labelStyle.concat(),
				args = Array.prototype.slice.call(arguments);
/* jshint ignore:start */
			this.options.info && buffer[0] && (buffer[0] += ":"+ ++this._count +" ") && buffer.push( this._getInfo() );
/* jshint ignore:end */
			console.log.apply( console, buffer );
			buffer = [];  // flush

			args.forEach(function(v) {
				if(/\[object \w+\]/.test(v)) {
					buffer.length && console.log.apply( console, buffer );
					buffer = [];  // flush

					this._formatGroup(v);
				} else {
					buffer.push(v);
				}
			}, this);

			buffer.length && console.log.apply( console, buffer );
		} : function() {
			if( !this._on ) { return; }
			console.log.apply( console, Array.prototype.slice.call(arguments) );
		};
	},

	/**
	 * To get link and line number
	 * @return {String}
	 */
	_getInfo : function() {
		var err = new Error(), stack,	info;

		if( err.fileName ) {  // Firefox
			info = err.fileName +" "+ err.lineNumber +":"+ err.columnNumber;
		} else {
			stack = err.stack;
			info = stack.match(/\w+:\/\/[^\n)]*/g);
			info = !info || info.length < 3 ? stack.match(/(at <anonymous|@debugger eval)[^\n]*/)[0] : info[2];
		}

		return info +"\n";
	},

	/**
	 * To log object items in group
	 * @param {Object} obj
	 */
	_formatGroup : function(obj) {
		var len = Object.keys(obj).length;

		console[ len > this.options.uncollapsedCount || len === 0 ? "groupCollapsed" : "group" ](obj +"");

		for(var x in obj) {
			console.log("%c"+ x +":", "font-weight:bold;color:brown", obj[x]);
		}

		console.groupEnd();
	},

	/**
	 * To log object items in group
	 * @param {Object} obj
	 */
	_formatGroupLayer : function(obj) {
		var res = [ obj +"" ];

		for(var x in obj) {
			res.push("<span style='color:cyan'>"+ x +"</span> : "+ obj[x]);
		}

		return res.join("<br>");
	},

	/**
	 * For environments which don't support console API
	 */
	_makeConsoleLayer : function() {
		var div = document.createElement("div"),
			style = document.createElement("style"),
			layerId = "__log";

		div.id = layerId +"Wrapper";

		style.type = "text/css";
		style.innerHTML = [
			"#__logWrapper{position:fixed;top:calc(100% - 158px);left:0;opacity:0.8;width:calc(100% - 8px);height:150px;border:solid 4px red;overflow-y:auto;background-color:#000;z-index:10000;color:white;font-family:HelveticaNeue-Bold,AppleSDGothicNeo-Light,sans-serif;font-size:12px}",
			"#__logWrapper.top{top:0}",
			"#__logWrapper.min{width:20px;height:20px;top:calc(100% - 20px - 8px);left:calc(100% - 28px)}",
			"#__logWrapper.min .cmd{display:none}",
			"#__logWrapper .cmd{position:fixed;left:0;width:100%;height:25px;text-align:center}",
			"#__logWrapper .log{margin-top:25px}",
			"#__logWrapper .label{color:"+ this.style.color +";background-color:"+ this.style.bgcolor +";font-size:"+ this.style.size +"px}",
			"#__logWrapper input{width:calc(100% - 190px);border-radius:5px}",
			"#__logWrapper button{width:40px;height:22px;margin:0;padding:0;background-color:#fff;color:#000;border:0;border-radius:10px;font-weight:bold}"
		].join("");

		(document.head || document.getElementsByTagName("head")[0]).appendChild(style);

		div.innerHTML = "<div class='cmd'><button>P</button> <input id='"+ layerId +"Input' /> "+
			"<button>C</button> <button>_</button> <button style='background-color:red;color:#fff'>X</button></div>" +
			"<div class='log' id='"+ layerId +"'></div>";
		document.body.appendChild(div);

		this._bindEvent(layerId);
		this._consoleWrapperLayer(layerId);
	},

	/**
	 * Bind events
	 * @param {String} layerId
	 */
	_bindEvent : function(layerId) {
		var alias = this.options.alias;

		document.getElementById(layerId +"Input").addEventListener("keydown", function(e) {
			var el = e.target;

			if(e.keyCode === 13 && el.value) {
				try {
					/* jshint ignore:start */
					window[ alias ](eval(el.value));
					/* jshint ignore:end */
				} catch(err) {
					window[ alias ](err);
				}

				el.value = "";
			}
		});

		document.getElementById(layerId +"Wrapper").addEventListener("click", function(e) {
			var el = e.target,
				logDiv = document.getElementById(layerId),
				wrapper = document.getElementById(layerId +"Wrapper");

			if(el.tagName === "BUTTON") {
				switch(el.innerHTML) {
					case "P":  // toggle position
						if(~wrapper.className.indexOf("top")) {
							wrapper.className = wrapper.className.replace(/\s?top/,"");
						} else {
							wrapper.className += " top";
						}
						break;
					case "C":  // clear
						logDiv.innerHTML = "";
						break;
					case "_":  // minimize
						wrapper.className += " min";
						break;
					case "X":  // close
						wrapper.parentNode.removeChild(wrapper);
						window[ alias ] = null;
				}
			} else if(el === wrapper && ~el.className.indexOf("min")) {
				el.className = el.className.replace(/\s?min/,"");
			}
		}, false);
	},

	/**
	 * Build function to log on layer
	 * @param {String} layerId
	 */
	_consoleWrapperLayer : function(layerId) {
		var el = document.getElementById(layerId);

		window[ this.options.alias ] = (function() {

			var args = Array.prototype.slice.call(arguments),
				buffer = [ " <span class='label'> "+ this.options.label +":"+ (++this._count) +" </span>&nbsp;" ];

			args.forEach(function(v) {
				buffer.push( /\[object \w+\]/.test(v) ? this._formatGroupLayer(v) : v );
			}, this);

			el.insertAdjacentHTML("afterbegin", buffer.join("") +"<br>");
		}).bind(this);
	}
};

// Automatic initialization
/* jshint ignore:start */
!function(script) {
	script && /\?init$/.test(script.src) && window.LogHelper.init();
}( document.querySelector("[src*=loghelper]") );
/* jshint ignore:end */
