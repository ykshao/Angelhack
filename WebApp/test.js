var canvas, ctx;
var prevX, prevY;
var mousePressed = false;
var thickness = 5;
var greyness = 0;

function init() {

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.rect(0, 0, 1500, 600);
	ctx.fillStyle = 'white';
	ctx.fill();

	//dividers[0].style.left = (3 * (window.innerWidth / 12)) + 'px';

	$('#canvas').mousedown(function(e) {
		// if (eraserPressed) {
		// 	eraserMode = true;
		// 	erase(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		// } else {
		// 	drawMode = true;
		// 	draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
		// }
		if (MODE === 'DRAW') {
			draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
		} else if (MODE === 'ERASE') {
			erase(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		}
		mousePressed = true;
	});

	$('#canvas').mousemove(function(e) {
		// if (drawMode) {
		// 	draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		// } else if (eraserMode) {
		// 	erase(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
		// }
		if (mousePressed) {
			if (MODE === 'DRAW') {
				draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
			} else if (MODE === 'ERASE') {
				erase(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);	
			}
		}
	});

	$('#canvas').mouseup(function(e) {
		// drawMode = false;
		//eraserMode = false;
		mousePressed = false;
	});

	// $('#canvas').mouseleave(function(e) {
	// 	drawMode = false;
	// 	eraserMode = false;
	// });

	// window.addEventListener('resize', resizeCanvas, false);
}

function getColour(greyness) {
	return 'rgb(' + greyness + ',' + greyness + ',' + greyness + ')';
}

function draw(x, y, pressed) {
	if (pressed) {
		ctx.beginPath();
		ctx.strokeStyle = getColour(greyness);
		ctx.lineWidth = thickness;
		ctx.lineJoin = 'round';
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
	}
	prevX = x;
	prevY = y;
}

function erase(x, y, pressed) {
	if (pressed) {
		ctx.fillStyle = 'white';
		ctx.fillRect(x, y, -thickness, -thickness);
		ctx.fillRect(x, y, thickness, -thickness);
		ctx.fillRect(x, y, -thickness, thickness);
		ctx.fillRect(x, y, thickness, thickness);
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.beginPath();
	ctx.rect(0, 0, 1500, 600);
	ctx.fillStyle = 'white';
	ctx.fill();
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