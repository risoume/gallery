// Risou, 2023
// risoume.github.io

let title = "Study-Arc";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#fffbe6');
    noStroke();

    let n = int(random(2, 8)); // number of row = column
    let s = width / (n+1); // length of the tile
    let mult = 0.8; // ratio of the design with the tile

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            arcs((i+1)*s, (j+1)*s, s*mult);
        }
    }
}

// Draw 4 arcs of flower with center (x,y) and diameter d
function arcs(x, y, d) {
    let x1 = int(random(-20, 20));
    let x2 = int(random(-20, 20));
    let angles = [45 + x1, 45 - x1, 45 + x2, 45 - x2];

    let k = random(0.7, 1);
    let lastAngle = random(PI);
    for (let i = 0; i < 4; i++) {
        fill(random(palette));
        arc(x, y, d*k, d*k, lastAngle, lastAngle + radians(angles[i]));
        lastAngle += radians(45 + angles[i]);
    }

    // Make the center empty
    fill('#fffbe6');
    circle(x, y, random(d/7, d/5));
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
