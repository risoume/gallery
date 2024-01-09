// Risou, 2023
// risoume.github.io

let title = "Squares-2";

let palette = ['#AAFF00', '#FFAA00', '#FF00AA', '#AA00FF', '#00AAFF'];

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
    
    circ(width*0.25, height*0.25, width/6);
    circ(width*0.75, height*0.25, width/6);
    circ(width*0.75, height*0.75, width/6);
    circ(width*0.25, height*0.75, width/6);
    circ(width/2, height/2, width/3);
}

function circ(x, y, s) {
    strokeWeight(0.1*s);
    if (s < 10)
        fill(random(palette));
    if (s < 10) return;
    
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
