// Risou, 2023
// risoume.github.io

let title = "Textile-3";

let palette = ['#FFEDBF', '#F7803C', '#F54828', '#2E0D23', '#F8E4C1'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(random(palette));
    stroke(0);
    strokeWeight(2);
  
    let k = 100;
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < k/2; i++) {
            fill(random(palette));
            if (random() < 0.5) {
                rect(300+i*width/k, 0, width/k, height);
                rect(300-(1+i)*width/k, 0, width/k, height);
            }
            else {
                rect(0, 300+i*width/k, height, width/k);
                rect(0, 300-(i+1)*width/k, height, width/k);
            }
        }
    }

    // Frame
    strokeWeight(60);
    noFill();
    rect(0, 0, width, height);
    stroke(255);
    strokeWeight(40);
    rect(0, 0, width, height);
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
