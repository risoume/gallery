// Risou, 2023
// risoume.github.io

let title = "Tetris-L";

let palette = ['#E8D5B7', '#0E2430', '#FC3A51', '#F5B349'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background(255);

	// Create a list of l tetris
	let n = int(random(1, 8)); // number of l tetris in a row and a column
	let u = width / n; // length of square tile component of l
	let ls = [];
	for (let i = 0; i < n; i++) {
		ls.push([]);
		for (let j = 0; j < n; j++) {
			ls[i].push( new L(j*u, i*u, u) );
		}
	}

	// Draw all l tetris
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			ls[i][j].draw();
		}
	}


	// Picture

	let x = 160; // top left corner x
	let y = 120; // top left corner y
	let w = width - 2*x; // picture's wide
	let h = height - 2*y; // picture's high
	
	let s = w / 4; // length of square design on frame
	let pad = 8; // thickness of frame
	let n2 = 1; // number of small l tetris in a row and a column
	let u2 = (s-2*pad) / n2; // length of square tile component of l
	
	let small_ls = [];
	for (let i = 0; i < n2; i++) {
		small_ls.push([]);
		for (let j = 0; j < n2; j++) {
			small_ls[i].push( new L(width/2-s+pad+j*u2, height/2+s/2+pad+i*u2, u2) );
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
	rect(width/2, height/2 + s/2, -s, -s); // Center left
	rect(width/2, height/2 - s/2, -s, -s); // Up left
	rect(width/2, height/2 + s/2, -s, s); // Down left
	rect(width/2, height/2 + s/2, s, s); // Down right

	// Draw all small l tetris
	strokeWeight(2);
	for (let i = 0; i < n2; i++) {
		for (let j = 0; j < n2; j++) {
			small_ls[i][j].draw();
		}
	}

	stroke(0);
	noFill();
	rect(width/2-s+pad, height/2+s/2+pad, s-2*pad, s-2*pad);
}

// L shape tetris
class L {
	constructor(x, y, s) {
		this.x = x;
		this.y = y;
		this.u = s / 4;
	}
  
	draw() {
		noStroke();
		// Different colors for each L tetris in a tile
		let p = shuffle(palette);

		// Up Left
		fill(p[0]);
		square(this.x, this.y+this.u, this.u);
		rect(this.x, this.y, 3*this.u, this.u);
		
		// Up Right
		fill(p[1]);
		rect(this.x + this.u, this.y + this.u, 3*this.u, this.u);
		square(this.x + 3*this.u, this.y, this.u);
	    
		// Bottom Left
		fill(p[2]);
		rect(this.x, this.y + 3*this.u, 3*this.u, this.u);
		square(this.x, this.y + 2*this.u, this.u);
		
		// Bottom Right
		fill(p[3]);
		square(this.x + 3*this.u, this.y + 3*this.u, this.u);
		rect(this.x + this.u, this.y + 2*this.u, 3*this.u, this.u);
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
