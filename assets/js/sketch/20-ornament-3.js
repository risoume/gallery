// Risou, 2023
// risoume.github.io

let title = "Ornament-3";

let palette_ = [
    ['#00A5E3', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65'],
    ['#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'], 
];

let palette;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    rectMode(CENTER);
    noLoop();
}

function draw() {
    background(255);
    palette = random(palette_);
    noStroke();
    let s = 20;
    for (let i = 20; i < width; i += s) {
        for (let j = 20; j < height; j += s) {
            fill(random(palette));
            square(i, j, s);
        }
    }

    // tone
    fill(0, 10);
    rect(300, 300, 600, 600);

    noFill();
    stroke(0);
    reccRecc(width/2, height/2, width/4);

    stroke(0);
    strokeWeight(20);
    rect(300, 300, width, height);
}

function reccRecc(x, y, s) {
    if (s < width/48) return;
    recc(x, y, s);
    reccRecc(x-s, y-s, s/2);
    reccRecc(x-s, y+s, s/2);
    reccRecc(x+s, y-s, s/2);
    reccRecc(x+s, y+s, s/2);
}

function recc(x, y, s) {
    if (s < 18) return;
    strokeWeight(0.1*s);
    rect(x, y, s, s);
    recc(x, y-s/2, s/2);
    recc(x, y+s/2, s/2);
    recc(x+s/2, y, s/2);
    recc(x-s/2, y, s/2);
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
