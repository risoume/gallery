// Risou, 2023
// risoume.github.io

let title = "Minimal";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65'];
let pad = 20;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#fffbe6');
    noStroke();
    translate(pad, pad);
    
    let s = width - 2*pad; // side of initial square
    let m = int(random(5, 9)) / 10; // ratio of next side and current side

    while (s > 10) {
        fill(random(palette));
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
