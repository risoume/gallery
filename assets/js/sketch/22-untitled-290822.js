// Risou, 2023
// risoume.github.io

let title = "290822";

let palette = ['#F0D8A8', '#3D1C00', '#86B8B1', '#F2D694', '#FA2A00'];

let scale = 0.85;
let pad = 30;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(palette[0]);
    translate(pad, pad);
    let s = width - 2*pad;
    let pad2 = 20;
    let w = (s-3*pad2) / 2;
    
    fill(0);
    square(0, 0, s);

    grid(pad2, pad2, w);
    grid(w+2*pad2, pad2, w);
    grid(pad2, w+2*pad2, w);
    grid(w+2*pad2, w+2*pad2, w);
}

function grid(x, y, w) {
    let coor;
    let q;
    
    noStroke();
    push();
    translate(x, y);
    while (w > 10) {
        fill(random(palette));
        square(0, 0, w);
        coor = [[0, 0], [w-w*scale, 0], [0, w-w*scale], [w-w*scale, w-w*scale]];
        q = random(coor);
        translate(q[0], q[1]);
        w *= scale;
    }
    pop();
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
