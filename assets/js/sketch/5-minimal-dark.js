// Risou, 2023
// risoume.github.io

let title = "Minimal-Dark";

let pad = 80;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#212121');
    noStroke();
    translate(pad, pad);
    
    let s = width - 2*pad; // side of initial square
    let m = 0.9; // ratio of next side and current side

    while (s > 10) {
        fill(map(s, 10, width-2*m, 0, 1000));
        square(0, 0, s);
        let coor = [[0, 0], [s-s*m, 0], [0, s-s*m], [s-s*m, s-s*m]];
        let q = random(coor);
        translate(q[0], q[1]);
        s *= m;
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
