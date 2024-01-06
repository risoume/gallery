// Risou, 2023
// risoume.github.io

let title = "Block-3";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65'];

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

	s = 120;
	for (let i = 20; i < width; i += 80) {
		for (let j = 20; j < height; j += 80) {
			c = color(random(palette))
			c.setAlpha(200)
			fill(c);
			let t = int(random(1, 4));
      		square(i, j, t*s);
		}
	}

	s = 80;
	stroke(50);
	noFill();
	for (let i = 60; i < width+160; i += 160) {
		for (let j = 20; j < height+120; j += 80) {
			c = color(random(palette))
			c.setAlpha(150)
			fill(c);
			if (random(1) < 0.5) continue;
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
