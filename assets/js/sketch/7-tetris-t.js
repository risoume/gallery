// Risou, 2023
// risoume.github.io

let title = "Tetris-T";

let palette = ['#D1313D', '#E5625C', '#F9BF76', '#8EB2C5', '#615375'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background(255);

	// Create a list of t tetris
	let n = int(random(1, 10)); // number of t tetris in a row and a column
	let u = width / n; // length of square tile component of t
	let ts = [];
	for (let i = 0; i < n; i++) {
		ts.push([]);
		for (let j = 0; j < n; j++) {
			ts[i].push( new T(j*u, i*u, u) );
		}
	}

	// Draw all t tetris
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			ts[i][j].draw();
		}
	}


	// Picture

	let x = 120; // top left corner x
	let y = 160; // top left corner y
	let w = width - 2*x; // picture's wide
	let h = height - 2*y; // picture's high
	
	let s = h / 4; // length of square design on frame
	let pad = 8; // thickness of frame
	let n2 = 1; // number of small t tetris in a row and a column
	let u2 = (s-2*pad) / n2; // length of square tile component of t
	
	let small_ts = [];
	for (let i = 0; i < n2; i++) {
		small_ts.push([]);
		for (let j = 0; j < n2; j++) {
			small_ts[i].push( new T(width/2-s/2+pad+j*u2, height/2+pad+i*u2, u2) );
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
	rect(width/2 - s/2, height/2, s, -s); // Up center
	rect(width/2 + s/2, height/2, s, -s); // Up right
	rect(width/2 - s/2, height/2, -s, -s); // Up left
	rect(width/2 - s/2, height/2, s, s); // bottom center

	// Draw all small t tetris
	strokeWeight(2);
	for (let i = 0; i < n2; i++) {
		for (let j = 0; j < n2; j++) {
			small_ts[i][j].draw();
		}
	}

	stroke(0);
	noFill();
	rect(width/2-s/2+pad, height/2+pad, s-2*pad, s-2*pad);
}

// T shape tetris
class T {
	constructor(x, y, s) {
		this.x = x;
		this.y = y;
		this.u = s / 4;
	}
  
	draw() {
		noStroke();
		// Different colors for each T tetris in a tile
		let p = shuffle(palette);

		// Up Left
		fill(p[0]);
		square(this.x + this.u, this.y + this.u, this.u);
		rect(this.x, this.y, this.u, 3*this.u);
		
		// Up Right
		fill(p[1]);
		rect(this.x + this.u, this.y, 3*this.u, this.u);
		square(this.x + 2*this.u, this.y + this.u, this.u);
	    
		// Bottom Left
		fill(p[2]);
		rect(this.x, this.y + 3*this.u, 3*this.u, this.u);
		square(this.x + this.u, this.y + 2*this.u, this.u);
		
		// Bottom Right
		fill(p[3]);
		square(this.x + 2*this.u, this.y + 2*this.u, this.u);
		rect(this.x + 3*this.u, this.y + this.u, this.u, 3*this.u);
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
