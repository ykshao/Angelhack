var WILL = {
	backgroundColor: Module.Color.WHITE,
	color: Module.Color.BLACK,
	
	mousePosX: 0,
	mousePosY: 0,

	init: function(width, height) {
		this.initInkEngine(width, height);
		this.initEvents();
	},

	initInkEngine: function(width, height) {
		this.canvas = new Module.InkCanvas(document.getElementById("canvas"), width, height);
		this.canvas.clear(this.backgroundColor);

		this.brush = new Module.DirectBrush();

		this.pathBuilder = new Module.SpeedPathBuilder();
		this.pathBuilder.setNormalizationConfig(182, 3547);
		this.pathBuilder.setPropertyConfig(Module.PropertyName.Width, 2.05, 34.53, 0.72, NaN, Module.PropertyFunction.Power, 1.19, false);

		this.smoothener = new Module.MultiChannelSmoothener(this.pathBuilder.stride);

		this.strokeRenderer = new Module.StrokeRenderer(this.canvas, this.canvas);
		this.strokeRenderer.configure({brush: this.brush, color: this.color});
	},

	initEvents: function() {
		var self = this;
		$(Module.canvas).on("mousedown", function(e) {self.beginStroke(e);});
		$(Module.canvas).on("mousemove", function(e) {self.moveStroke(e);});
		$(document).on("mouseup", function(e) {self.endStroke(e);});
	},

	setMousePos: function(evt) {
		var canvas = document.getElementById('canvas');
		var rect = canvas.getBoundingClientRect();
	 	this.mousePosX = evt.clientX - rect.left;
	 	this.mousePosY = evt.clientY - rect.top;
	},

	beginStroke: function(e) {
		if (e.button != 0) return;
	
		this.inputPhase = Module.InputPhase.Begin;

		this.setMousePos(e);
		
		this.buildPath({x: this.mousePosX, y: this.mousePosY});
		this.drawPath();
	},

	moveStroke: function(e) {
		if (!this.inputPhase) return;
		
		this.inputPhase = Module.InputPhase.Move;

		this.setMousePos(e);
		
		this.pointerPos = {x: this.mousePosX, y: this.mousePosY};

		if (WILL.frameID != WILL.canvas.frameID) {
			var self = this;

			WILL.frameID = WILL.canvas.requestAnimationFrame(function() {
				if (self.inputPhase && self.inputPhase == Module.InputPhase.Move) {
					self.buildPath(self.pointerPos);
					self.drawPath();
				}
			}, true);
		}
	},

	endStroke: function(e) {
		if (!this.inputPhase) return;
		
		this.inputPhase = Module.InputPhase.End;

		this.setMousePos(e);
		
		this.buildPath({x: this.mousePosX, y: this.mousePosY});
		this.drawPath();

		delete this.inputPhase;
	},

	buildPath: function(pos) {
		
		if (this.inputPhase == Module.InputPhase.Begin)
			this.smoothener.reset();

		var pathPart = this.pathBuilder.addPoint(this.inputPhase, pos, Date.now()/1000);
		var smoothedPathPart = this.smoothener.smooth(pathPart, this.inputPhase == Module.InputPhase.End);
		var pathContext = this.pathBuilder.addPathPart(smoothedPathPart);

		this.pathPart = pathContext.getPathPart();
	},

	drawPath: function() {
		this.strokeRenderer.draw(this.pathPart, this.inputPhase == Module.InputPhase.End);
	},

	clear: function() {
		this.canvas.clear(this.backgroundColor);
	}
};

Module.addPostScript(function() {
	WILL.init(1500, 600);
});