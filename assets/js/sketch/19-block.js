// Risou, 2023
// risoume.github.io

let title = "Block";

let palette = ['#FFEDBF', '#F7803C', '#F54828', '#2E0D23', '#F8E4C1'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	rectMode(CENTER);
	noLoop();
}

function draw() {
	background(255);
	noStroke();
	let s;
	let c;

	s = 40;
	for (let i = 20; i < width; i += 40) {
		for (let j = 20; j < height; j += 20) {
			c = color(random(palette))
			c.setAlpha(50)
			fill(c);
			square(i, j, s);
		}
	}

	s = 20;
	for (let i = 20; i < width; i += 20) {
		for (let j = 20; j < height; j += 40) {
			c = color(random(palette))
			c.setAlpha(100)
			fill(c);
			square(i, j, s);
		}
	}

	s = 20;
	for (let i = 20; i < width; i += 40) {
		for (let j = 20; j < height; j += 20) {
			c = color(random(palette))
			c.setAlpha(200) // 50
			fill(c);
			square(i, j, s);
		}
	}

	stroke(50);
	strokeWeight(3);
	for (let i = 20; i < width; i += 20) {
		for (let j = 20; j < height; j += 20) {
			point(i, j);
		}
	}

	let r = 10;
	strokeWeight(1);
	for (let i = 20; i < width; i += 40) {
		for (let j = 20; j < height; j += 40) {
			fill(random(palette));
			circle(i, j, r);
		}
	}

	for (let i = 20; i < width; i += 40) {
		for (let j = 20; j < height; j += 60) {
			fill(random(palette));
			square(i, j, r);
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
