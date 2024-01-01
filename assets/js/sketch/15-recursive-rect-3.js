// Risou, 2023
// risoume.github.io

let title = "Recursive-Rect-3";

let palette = ['#F0D8A8', '#3D1C00', '#86B8B1', '#F2D694', '#FA2A00'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	rectMode(CENTER);
	noLoop();
}

function draw() {
	background(random(palette));
	noFill();
	recc(width/2, height/2, width/2);
}

function recc(x, y, s) {
	if (s < 5) return;
	
	noStroke();
	fill(random(palette));
	strokeWeight(0.1*s);
	ellipse(x, y, s, s);

	push();
	translate(x, y);
	stroke(0);
	for (let i = 0; i < 10; i++) {
		let t1 = random(TWO_PI);
		let t2 = random(TWO_PI);
		line(s/2*cos(t1), s/2*sin(t1), s/2*cos(t2), s/2*sin(t2));
	}
	pop();

	recc(x-s/2, y-s/2, s/2);
	recc(x-s/2, y+s/2, s/2);
	recc(x+s/2, y-s/2, s/2);
	recc(x+s/2, y+s/2, s/2);
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
