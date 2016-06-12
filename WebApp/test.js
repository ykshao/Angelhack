var canvas, ctx;
var prevX, prevY;
var drawMode = false;

function init() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	//dividers[0].style.left = (3 * (window.innerWidth / 12)) + 'px';

	$('#canvas').mousedown(function(e) {
		// if (eraserPressed) {
		// 	eraserMode = true;
		// 	erase(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		// } else {
		// 	drawMode = true;
		// 	draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
		// }
		drawMode = true;
		draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
	});

	$('#canvas').mousemove(function(e) {
		// if (drawMode) {
		// 	draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		// } else if (eraserMode) {
		// 	erase(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		// }
		if (drawMode) {
			draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		}
	});

	$('#canvas').mouseup(function(e) {
		drawMode = false;
		//eraserMode = false;
	});

	// $('#canvas').mouseleave(function(e) {
	// 	drawMode = false;
	// 	eraserMode = false;
	// });

	// window.addEventListener('resize', resizeCanvas, false);
}

function draw(x, y, pressed) {
	if (pressed) {
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 5;
		ctx.lineJoin = 'round';
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
	}
	prevX = x;
	prevY = y;
}

// function doCanvas() {
//     /* draw something */
//     ctx.fillStyle = '#f90';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = '#fff';
//     ctx.font = '60px sans-serif';
//     ctx.fillText('Code Project', 10, canvas.height / 2 - 15);
//     ctx.font = '26px sans-serif';
//     ctx.fillText('Click link below to save this as image', 15, canvas.height / 2 + 35);
// }

// doCanvas();