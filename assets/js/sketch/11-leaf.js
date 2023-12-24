// Risou, 2023
// risoume.github.io

let title = "Leaf";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FFBF65'];

let pad = 60;

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background('#FF5768');
	translate(pad, pad);
	let n = int(random(8, 15))
	n = 8;
	let s = (width - 2*pad) / n;
	let mult = 0.6;

	let grids = [];
	for (let i = 0; i < n; i++) {
		grids.push([]);
		for (let j = 0; j < n; j++) {
			grids[i][j] = new Leaves(j*s+(s-s*mult)/2, i*s+(s-s*mult)/2, s*mult);
		}
	}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			grids[i][j].display();
		}
	}
}

class Leaves {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.r = d / 2;
	}
	
	display() {
		push();
		translate(this.x + this.r, this.y + this.r);

		let p = createVector();
		let q = createVector();

		let points = 10;
		let size = 40;
		
		for (let i = 0; i < points; i++) {
			p.x = this.r * cos(TWO_PI * i / points);
			p.y = this.r * sin(TWO_PI * i / points);
			fill(random(palette));
			this.leaf(p.x, p.y, size, 1, p.heading());
			
			q.x = this.r * cos((TWO_PI * i + PI) / points);
			q.y = this.r * sin((TWO_PI * i + PI) / points);
			fill(random(palette));
			this.leaf(q.x, q.y, size, -1, p.heading());
		}
		pop();
	}
	
	leaf(x, y, size, dir, a) {
		push();
		translate(x, y);
		rotate(a);
		scale(size);
		
		noStroke();
		beginShape();
		vertex(1*dir, -0.7);
		bezierVertex(1*dir, -0.7, 0.4*dir, -1, 0, 0);
		bezierVertex(0, 0, 1*dir, 0.4, 1*dir, -0.7);
		endShape();
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
