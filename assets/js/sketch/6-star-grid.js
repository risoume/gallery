// Risou, 2023
// risoume.github.io

let title = "Star-Grid";

let palettes = [
    ['#A16F00', '#FFAF00'],
    ['#0A538F', '#108BEF'],
];

let pad = 40;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    let palette = random(palettes);
    background(palette[1]);
    translate(pad, pad);

    let n = int(random(2, 6));
    let size = width - 2*pad;
    let s = size / n;
    let tiles = [];

    for (let i = 0; i < size; i += s) {
        for (let j = 0; j < size; j += s) {
            if (random() < 0.5) {
                tiles.push( new Star(i, j, s) );
            }
            else {
                tiles.push( new Star(i, j, s/2) );
                tiles.push( new Star(i+s/2, j, s/2) );
                tiles.push( new Star(i, j+s/2, s/2) );
                tiles.push( new Star(i+s/2, j+s/2, s/2) );
            }
        }
    }

    let radius1 = 4;
    let radius1Shadow = 2 * radius1;
    let off = s * 0.02;

    for (let i = 0; i < tiles.length; i++) {
        let points = int(random(9, 22));
        tiles[i].make(points, radius1Shadow, off, palette[0]);
        tiles[i].make(points, radius1, 0, palette[0]);
    }
}

class Star {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
    }

    make(n, radius1, off, color) {
        noFill();
        stroke(255);
        strokeWeight(4);
        square(this.x, this.y, this.s);
        
        fill(color);
        stroke(0);
        strokeWeight(1);

        let radius2 = this.s * 0.4;
        star(this.x + this.s/2 + off, this.y + this.s/2 + off, radius1, radius2, n);
    }
}

// Draw n point star with center at (x,y)
function star(x, y, radius1, radius2, n) {
    let angle = TWO_PI / n;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
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
