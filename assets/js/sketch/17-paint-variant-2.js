// Risou, 2023
// risoume.github.io

let title = "Paint-Variant-2";

let palette = ['#FC354C', '#29221F', '#13747D', '#0ABFBC', '#FCF7C5'];
let bg = ['#FC354C', '#FCF7C5'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	rectMode(CENTER);
	noLoop();
}

function draw() {
	background(random(bg));
	noStroke();

	let n = int(random(3, 9));
	let s = width / n;
	let mult = 0.8;
	let grids = [];
	
	for (let i = 0; i < n; i++) {
		grids.push([]);
		for (let j = 0; j < n; j++) {
			grids[i].push( new Grid(
				i*s+(s-s*mult)/2,
				j*s+(s-s*mult)/2,
				s*mult
			) );
		}
	}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			grids[i][j].display();
		}
	}
}

class Grid {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.r = d / 2;
	}
	
	display() {
		push();
		translate(this.x + this.r, this.y + this.r);
		fill(random(palette));
		square(0, 0, 2 * this.r);

		let points = int(random(10, 30));
		let x, y;
		let off = 5;
		off = int(random(10, 20));
		
		fill(random(palette));
		beginShape();
		for (let i = 0; i <= points; i++) {
			x = this.r * cos(TWO_PI*i/points) + random(-off, off);
			y = this.r * sin(TWO_PI*i/points) + random(-off, off);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
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
