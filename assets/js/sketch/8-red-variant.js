// Risou, 2023
// risoume.github.io

let title = "Red-Variant";

let pad = 60;
let n;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#db3a34');
    noFill();
    translate(pad, pad);

    n = int(random(4, 13));
    let m = n;
    let u = (width - 2*pad) / n; // length of square tile
    let mult = 1; // ratio between a tile and a circle design

    let grids = [];
    for (let i = 0; i < n; i++) {
        grids.push([]);
        for (let j = 0; j < m; j++) {
            grids[i].push( new Grid(j*u+u/2, i*u+u/2, u*mult) );
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            grids[i][j].display(j, i);
        }
    }
}

class Grid {
    constructor(x, y, u) {
        this.x = x;
        this.y = y;
        this.r = u / 2;
    }

    display(p, q) {
        push();
        translate(this.x, this.y);
        beginShape();
        for (let i = 0; i < (p+1)*(q+1); i++) {
            let t = PI * random(2);
            vertex(this.r * cos(t), this.r * sin(t));
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
