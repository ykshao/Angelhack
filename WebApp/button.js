
var MODE = 'DRAW';

// for buttons
function uploadImageClicked() {
	console.log("upload image clicked");
}

function colourItClicked() {
	console.log("colour image clicked");
}


function changeMode() {
	if (MODE === 'DRAW') {
		MODE = 'ERASE';
	} else {
		MODE = 'DRAW';
	}
	console.log('Changed mode to: ' + MODE);
}

function saveImageClicked() {
	console.log("save canvas image here")
	var canvas = document.getElementById("canvas"); 


	var imageURL = canvas.toDataURL();
	
}

// for sliders

// vibrance
function vibranceSliderOnChange(newValue) {
	console.log(newValue);
}

function vibranceSliderChanging(newValue) {
	console.log(newValue);	
}

// hue

function hueSliderOnChange(newValue) {

}


function hueSliderChanging(newValue) {

}

// saturation

function saturationSliderOnChange(newValue) {

}

function saturationSliderChanging(newValue) {

}

// colour sample rate

function colourSampleRateSliderOnChange(newValue) {

}

function colourSampleRateSliderChanging(newValue) {

}

