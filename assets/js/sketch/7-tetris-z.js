// Risou, 2023
// risoume.github.io

let title = "Tetris-Z";

let palette = ['#F28775', '#F7C289', '#EAE48F', '#F9D9C0', '#F9F6E4'];

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-container');
	pixelDensity(density);
	noLoop();
}

function draw() {
	background(255);

	// Create a list of z tetris
	let n = int(random(4, 13)); // number of z tetris in a row and a column
	let u = width / (2*n); // length of square tile component of z
	let zs = [];
	for (let i = 0; i < n; i++) {
		zs.push([]);
		for (let j = 0; j < n+1; j++) {
			zs[i].push( new Z((j-1)*2*u, i*2*u, n, u) );
		}
	}

	// Different colors for up, down, left, right
	let prev = -1;
	let curr = random(palette);
	
	for (let j = 0; j < n+1; j++) {
		while(prev == curr) {
			curr = random(palette);
		}
		zs[0][j].color = curr;
		prev = curr;
	}
	
	for (let i = 1; i < n; i++) {
		for (let j = 0; j < n+1; j++) {
			while(prev == curr || curr == zs[i-1][j].color) {
				curr = random(palette);
			}
			zs[i][j].color = curr;
			prev = curr;
		}
	}

	// Draw all z tetris
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n+1; j++) {
			fill(zs[i][j].color)
			zs[i][j].draw();
		}
	}


	// Picture

	let x = 160; // top left corner x
	let y = 120; // top left corner y
	let w = width - 2*x; // picture's wide
	let h = height - 2*y; // picture's high
	
	let s = w / 4; // length of square design on frame
	let pad = 8; // thickness of frame
	let n2 = 3; // number of small z tetris in a row and a column
	let u2 = (s-2*pad) / (2*n2); // length of square tile component of z
	
	let small_zs = [];
	for (let i = 0; i < n2; i++) {
		small_zs.push([]);
		for (let j = 0; j < n2+1; j++) {
			small_zs[i].push( new Z(width/2+pad+(j-1)*2*u2, height/2-s/2+pad+i*2*u2, n2, u2) );
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

	// Draw all small z tetris
	strokeWeight(2);
	for (let i = 0; i < n2; i++) {
		for (let j = 0; j < n2+1; j++) {
			fill(zs[i][j].color)
			small_zs[i][j].draw();
		}
	}

	translate(width/2, height/2);

	stroke(0);
	fill(255);
	rect(0, -s/2, s, -s); // Up right
	rect(0, s/2, -s, s); // Down left
	rect(0, -s/2, -s, s); // Center left
	
	beginShape();
	vertex(0, s/2);
	vertex(s, s/2);
	vertex(s, -s/2);
	vertex(0, -s/2);
	beginContour();
	vertex(pad, s/2-pad);
	vertex(pad, -s/2+pad);
	vertex(s-pad, -s/2+pad);
	vertex(s-pad, s/2-pad);
	endContour();
	endShape(CLOSE);
}

// Z shape tetris
class Z {
	constructor(x, y, n, u) {
	  this.x = x;
	  this.y = y;
	  this.n = n;
	  this.u = u;
	}
  
	draw() {
		noStroke();
		square(this.x, this.y, this.u);
		square(this.x + this.u, this.y + this.u, this.u);
		square(this.x + this.u, this.y, this.u);
		square(this.x + 2*this.u, this.y + this.u, this.u);
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
