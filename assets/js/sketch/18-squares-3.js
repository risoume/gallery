// Risou, 2023
// risoume.github.io

let title = "Squares-3";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    rectMode(CENTER);
    noLoop();
}

function draw() {
    background(random(palette));
    noFill();
    circRecc(width/2, height/2, width/4);
}

function circRecc(x, y, s) {
    if (s < 5) return;
    circ(x, y, s);
    circRecc(x-s, y-s, s/2);
    circRecc(x-s, y+s, s/2);
    circRecc(x+s, y-s, s/2);
    circRecc(x+s, y+s, s/2);
}

function circ(x, y, s) {
    strokeWeight(0.1*s);
    if (s < 10)
        fill(random(palette));
    if (s < 5) return;
    
    square(x, y, s);
    noFill();
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
