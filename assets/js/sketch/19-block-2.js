// Risou, 2023
// risoume.github.io

let title = "Block-2";

let palette = ['#D1313D', '#E5625C', '#F9BF76', '#8EB2C5', '#615375'];

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

	stroke(0);
	s = 80;
	for (let i = 20; i < width; i += 80) {
		for (let j = 20; j < height; j += 80) {
			c = color(random(palette))
			c.setAlpha(50)
			fill(c);
			circle(i, j, s);
		}
	}

	noStroke();
	s = 40;
	for (let i = 20; i < width; i += 40) {
		for (let j = 20; j < height; j += 80) {
			c = color(random(palette))
			c.setAlpha(150)
			fill(c);
			square(i, j, s);
		}
	}

	s = 25;
	for (let i = 20; i < width; i += 80) {
		for (let j = 20; j < height; j += 80) {
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
	for (let i = 20; i < width; i += 80) {
		for (let j = 20; j < height; j += 40) {
			fill(random(palette));
			circle(i, j, r);
		}
	}

	for (let i = 20; i < width; i += 80) {
		for (let j = 20; j < height; j += 120) {
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
