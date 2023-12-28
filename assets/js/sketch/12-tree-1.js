// Risou, 2023
// risoume.github.io

let title = "Tree-1";

let palette = ['#F0D8A8', '#3D1C00', '#86B8B1', '#F2D694', '#FA2A00']; 

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background('#F0D8A8');
	let trees = [];
	let treeCount = int(random(20, 80));

	for (let i = 0; i < treeCount; i++) {
		trees.push( new Tree(
			int(random(5, width-5)),
			int(random(400, height)),
			int(random(40, 150)),
			radians(random(5, 15))
		) );
	}

	for (let i = 0; i < treeCount; i++) {
		trees[i].draw();
	}
}

class Tree {
	constructor(rootX, rootY, h, theta) {
		this.rootX = rootX;
		this.rootY = rootY;
		this.h = h;
		this.theta = theta;
	}

	draw() {
		push();
		translate(this.rootX, this.rootY);
		this.branch(this.h);
		pop();
	}
	
	branch(t) {
		stroke(random(palette));
		let sw = map(t, 2, 100, 1, 5);
		strokeWeight(sw);
		line(0, 0, 0, -t);
		translate(0, -t);
		t *= 0.7;

		if (t > 8) {
			push();
			rotate(this.theta);
			this.branch(t);
			pop();
			
			push();
			rotate(-this.theta);
			this.branch(t);
			pop();
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
