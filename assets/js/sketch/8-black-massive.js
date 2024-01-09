// Risou, 2023
// risoume.github.io

let title = "Black-Massive";

let pad = 60;
let n;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(0);
    noFill();
    translate(pad, pad);

    n = 1;
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

    let lineNum = 10 * int(random(1, 11));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            grids[i][j].display(lineNum);
        }
    }
}

class Grid {
    constructor(x, y, u) {
        this.x = x;
        this.y = y;
        this.r = u / 2;
    }

    display(lineNum) {
        push();
        translate(this.x, this.y);

        let t = random(TWO_PI);
        let x1 = this.r * cos(t);
        let y1 = this.r * sin(t);
        let x2, y2;
        
        for (let i = 0; i < 250; i++) {
            t = random(TWO_PI);
            x2 = this.r * cos(t);
            y2 = this.r * sin(t);
            stroke(255, 80);
            strokeWeight(random(0.3, 2));
            line(x1, y1, x2, y2);
            x1 = x2;
            y1 = y2;
            stroke(0);
            strokeWeight(4);
            line(0, y1, x1, y1);
        }
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
