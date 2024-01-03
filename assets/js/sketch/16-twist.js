// Risou, 2023
// risoume.github.io

let title = "Twist";

let palette = ['#FC354C', '#29221F', '#13747D', '#0ABFBC', '#FCF7C5'];

let points = [];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background(palette[4]);
	noFill();
	stroke(0);
	for (let i = 0; i < 100; i++) {
		circle(int(random(width)), int(random(height)), int(random(2, 10)));
	}

	stroke(0);
	points = [];

	twist(30, 30, -5, 10);
	twist(100, 30, -5, 10);
	twist(30, 100, -5, 10);

	for (let i = 0; i < points.length; i++) {
		let size = 5;
		let sign = -1;
		x = points[i][0];
		y = points[i][1];

		// Left
		for (let j = 1; j < 100; j++) {
			fill(random(palette));
			circle(x, y, size);
			x += int(random(-10, 5));
			y += int(random(-5, 10));
			size += sign;
			if (size < 5 || size > 30) {
				sign *= -1;
			}
		}
		
		// Right
		size = 5;
		sign = -1;
		x = points[i][0];
		y = points[i][1];
		for (let j = 1; j < 100; j++) {
			fill(random(palette));
			circle(x, y, size);
			x += int(random(-5, 10));
			y += int(random(-10, 5));
			size += sign;
			if (size < 5 || size > 30) {
				sign *= -1;
			}
		}
	}
}

function twist(x, y, a, b) {
	let size = 30;
	let sign = -1;

	for (let i = 1; i < 250; i++) {
		fill(random(palette));
		circle(x, y, size);
		x += int(random(a, b));
		y += int(random(a, b));
		size += sign;
		if (size < 5) {
			sign *= -1;
			points.push([x,y])
		}
		if (size > 30) {
			sign *= -1;
		}
	}
}


// Toolbar

let density = 2;

function highQuality() {
	let hq = document.getElementById('HQ');
	if (hq.style.background === '') {
		hq.style.background = 'blue';
		hq.style.color = 'white';
		density = 4;
	}
	else {
		hq.style.background = '';
		hq.style.color = '';
		density = 2;
	}
	pixelDensity(density);
	redraw();
}

function generate() {redraw();}
function saveImg() {save(`${title}.jpg`);}
