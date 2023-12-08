// Risou, 2023
// risoume.github.io

let title = "Tetris-I-O";

let palette = ['#FFEDBF', '#F7803C', '#F54828', '#2E0D23', '#F8E4C1'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background(255);

	// Create a list of i o tetris
	let n = int(random(1, 11)); // number of t tetris in a row and a column
	let u = width / n; // length of square tile component of i o
	let ios = [];
	for (let i = 0; i < n; i++) {
		ios.push([]);
		for (let j = 0; j < n; j++) {
			ios[i].push( new IO(j*u, i*u, u) );
		}
	}

	// Draw all i o tetris
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			ios[i][j].draw();
		}
	}


	// Picture

	let x = 160; // top left corner x
	let y = 120; // top left corner y
	let w = width - 2*x; // picture's wide
	let h = height - 2*y; // picture's high
	
	let s = w / 5; // length of square design on frame
	let pad = 8; // thickness of frame
	let n2 = 1; // number of small i o tetris in a row and a column
	let u2 = (s-2*pad) / n2; // length of square tile component of i o
	
	let small_ios = [];
	for (let i = 0; i < n2; i++) {
		small_ios.push([]);
		for (let j = 0; j < n2; j++) {
			small_ios[i].push( new IO(width/2-3*s/4+pad+j*u2, height/2+pad+i*u2, u2) );
		}
	}

	// Frame Shadow
	let off = 12;
	fill(color(0, 0, 0, 90));
	noStroke();
	rect(x-off, y-off, w+2*off, h+2*off);

	// Frame
	fill('#fffbe6');
	stroke('#13151a');
	strokeWeight(pad);
	rect(x, y, w, h);

	stroke(0);
	strokeWeight(2);
	fill(255);
	// I box white
	rect(width/2 + 3*s/4, height/2, s, s);
	rect(width/2 + 3*s/4, height/2 - s, s, s);
	rect(width/2 + 3*s/4, height/2 - 2*s, s, s);
	rect(width/2 + 3*s/4, height/2 + s, s, s);

	// O white box
	rect(width/2 + s/4, height/2 + s, -s, s);
	rect(width/2 + s/4, height/2, -s, s);
	rect(width/2 - s+s/4, height/2 + s, -s, s);
	rect(width/2 - 3*s/4, height/2, -s, s);

	// Draw all small i o tetris
	strokeWeight(2);
	for (let i = 0; i < n2; i++) {
		for (let j = 0; j < n2; j++) {
			small_ios[i][j].draw();
		}
	}

	stroke(0);
	noFill();
	rect(width/2-3*s/4+pad, height/2+pad, s-2*pad, s-2*pad);
}

// IO shape tetris
class IO {
	constructor(x, y, s) {
		this.x = x;
		this.y = y;
		this.u = s / 4;
	}
  
	draw() {
		noStroke();
		// Different colors for each IO tetris in a tile
		let p = shuffle(palette);

		// Left
		fill(p[0]);
		rect(this.x, this.y, this.u, 4*this.u);
		
		// Middle Up
		fill(p[1]);
		square(this.x + this.u, this.y, 2*this.u);
	    
		// Middle Bottom
		fill(p[2]);
		square(this.x + this.u, this.y + 2*this.u, 2*this.u);
		
		// Right
		fill(p[3]);
		rect(this.x + 3*this.u, this.y, this.u, 4*this.u);
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
