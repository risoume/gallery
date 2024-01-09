// Risou, 2023
// risoume.github.io

let title = "Squares";

let palette = ['#F0D8A8', '#3D1C00', '#86B8B1', '#F2D694', '#FA2A00'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    rectMode(CENTER);
    noLoop();
}

function draw() {
    background(palette[0])
    circ(width/2, height/2, width/2);
}

function circ(x, y, s) {
    if (s < 5) return;
    noFill();

    if (s < 20)
        fill(random(palette));
    ellipse(x, y, s, s);

    circ(x, y-s/2, s/2);
    circ(x, y+s/2, s/2);
    circ(x+s/2, y, s/2);
    circ(x-s/2, y, s/2);
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
