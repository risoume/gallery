// Risou, 2023
// risoume.github.io

let title = "New-Signatures";

let paletteNode = ['#9DC9AC', '#FFFEC7', '#F56218', '#FF9D2E', '#919167'];
let palette = ['#D1313D', '#E5625C', '#F9BF76', '#8EB2C5', '#615375'];

let numTriangles = 5;
let nodeSize = 5;
let x1, y1, x2, y2, x3, y3;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    rectMode(CENTER);
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#fffbe6');
    
    let n = int(random(2, 8)); // number of row = column
    let s = width / (n+1); // length of the tile
    let mult = 0.8; // ratio of the design with the tile

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            triangles((i+1)*s, (j+1)*s, s*mult/2);
        }
    }
}

// Create random triangles inside a square with center (x,y) and side 2s
function triangles(x, y, s) {
    for (let i = 0; i < numTriangles; i++) {
        x1 = int(random(x-s, x+s));
        y1 = int(random(y-s, y+s));
        x2 = int(random(x-s, x+s));
        y2 = int(random(y-s, y+s));
        x3 = int(random(x-s, x+s));
        y3 = int(random(y-s, y+s));
        drawTriangle();
    }
}

// Draw a transparent triangle and color its nodes
function drawTriangle() {
    noFill();
    stroke(random(palette));
    triangle(x1, y1, x2, y2, x3, y3);
    noStroke();
    fill(random(paletteNode));
    circle(x1, y1, nodeSize);
    square(x2, y2, nodeSize);
    circle(x3, y3, nodeSize);
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
