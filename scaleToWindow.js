function scaleToWindow(canvas,
	margin_top = 0, margin_right = 0, margin_bottom = false, margin_left = false,
	backgroundColor) {
	//Margins have similar behaviour as HTML margins, does not scale with canvas

	var scaleX, scaleY, scale, center;

	//HTML margin behaviour
	if (margin_bottom === false) margin_bottom = margin_top !== 0 ? margin_top : 0;
	if (margin_left === false) margin_left = margin_right !== 0 ? margin_right : 0;

	//1. Scale the canvas to the correct size
	//Figure out the scale amount on each axis with margins accounted for
	scaleX = (window.innerWidth - margin_left - margin_right) / canvas.offsetWidth;
	scaleY = (window.innerHeight - margin_top - margin_bottom) / canvas.offsetHeight;

	//Scale the canvas based on whichever value is less: `scaleX` or `scaleY` and
	//2. Center the canvas.
	//Decide whether to center the canvas vertically or horizontally.
	//Wide canvases should be centered vertically, and 
	//square or tall canvases should be centered horizontally
	if (scaleX < scaleY) {
		scale = scaleX;
		center = "vertically";
	} else {
		scale = scaleY;
		center = "horizontally";
	}
	//Set the scale of the canvas
	canvas.style.transformOrigin = "0 0";
	canvas.style.transform = "scale(" + scale + ")";

	//Center horizontally (for square or tall canvases)
	var margin;
	if (center === "horizontally") {
		margin = ((window.innerWidth - margin_left - margin_right) - canvas.offsetWidth * scale) / 2;
		canvas.style.marginTop = margin_top + "px";
		canvas.style.marginBottom = margin_bottom + "px";
		canvas.style.marginLeft = (margin_left + margin) + "px";
		canvas.style.marginRight = (margin_right + margin) + "px";
	}

	//Center vertically (for wide canvases) 
	if (center === "vertically") {
		margin = ((window.innerHeight - margin_top - margin_bottom) - canvas.offsetHeight * scale) / 2;
		canvas.style.marginTop = (margin_top + margin) + "px";
		canvas.style.marginBottom = (margin_bottom + margin) + "px";
		canvas.style.marginLeft = margin_left + "px";
		canvas.style.marginRight = margin_right + "px";
	}

	//3. Remove any padding from the canvas  and body and set the canvas
	//display style to "block"
	canvas.style.paddingLeft = 0 + "px";
	canvas.style.paddingRight = 0 + "px";
	canvas.style.paddingTop = 0 + "px";
	canvas.style.paddingBottom = 0 + "px";
	canvas.style.display = "block";

	//4. Set the color of the HTML body background
	document.body.style.backgroundColor = backgroundColor;

	//Fix some quirkiness in scaling for Safari
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("safari") != -1) {
		if (ua.indexOf("chrome") > -1) {
			// Chrome
		} else {
			// Safari
			//canvas.style.maxHeight = "100%";
			//canvas.style.minHeight = "100%";
		}
	}

	//5. Return the `scale` value. This is important, because you'll nee this value 
	//for correct hit testing between the pointer and sprites
	return scale;
}