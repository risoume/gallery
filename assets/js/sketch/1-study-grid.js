// Risou, 2023
// risoume.github.io

let title = "Study-Grid";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FF5768', '#FFBF65'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    rectMode(CENTER);
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#fffbe6');
    stroke(0);

    let n = int(random(2, 9)); // number of row = column
    let s = width / (n+1); // length of the tile
    let mult = 0.8; // ratio of the design with the tile

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (random() < 0.5) {
                circles((i+1)*s, (j+1)*s, s*mult);
            }
            else {
                squares((i+1)*s, (j+1)*s, s*mult);
            }
        }
    }
}

// Draw a circle design with center (x, y) and diameter d
// Draw a smaller circle inside
function circles(x, y, d) {
    push();
    translate(x, y);

    let color1 = random(palette);
    fill(color1);
    strokeWeight(2);
    circle(0, 0, d);

    let angle = random(-PI, PI); 
    rotate(angle);

    let color2 = random(palette);
    while (color2 == color1) {
        color2 = random(palette);
    }
    fill(color2);
    strokeWeight(1);
    circle(d/4, 0, d/2);

    pop();
}

// Draw a square design with center (x, y) and side d
// Draw a smaller square inside
function squares(x, y, d) {
    push();
    translate(x, y);

    let color1 = random(palette);
    fill(color1);
    strokeWeight(2);
    square(0, 0, d);
    
    // center coordinate for the second square
    let center2 = [[0, 0], [d/4, 0], [0, d/4], [-d/4, 0], [0, -d/4]];
    let q = random(center2);
    translate(q[0], q[1]);

    let color2 = random(palette);
    while (color2 == color1) {
        color2 = random(palette);
    }
    fill(color2);
    strokeWeight(1);
    square(0, 0, d/2);

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
