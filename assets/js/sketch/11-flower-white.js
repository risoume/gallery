// Risou, 2023
// risoume.github.io

let title = "Flower-White";

let pad = 60;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(0);
    translate(pad, pad+30);
    let n = int(random(4, 7));
    let s = (width - 2*pad) / n;
    let mult = 0.6;

    let grids = [];
    for (let i = 0; i < n; i++) {
        grids.push([]);
        for (let j = 0; j < n; j++) {
            grids[i][j] = new Leaves(j*s+(s-s*mult)/2, i*s+(s-s*mult)/2, s*mult);
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            grids[i][j].display();
        }
    }

    translate(-pad, -pad-30);
    stroke(200);
    strokeWeight(0.5);
    for (let i = 0; i < 300; i++) {
        let x = random(width);
        let y = random(height);
        line(x, y, x, y + random(5, 20));
    }

    stroke(230);
    noFill();
    for (let i = 0; i < 100; i++) {
        circle(random(width), random(width), random(5, 10)); 
    }
}

class Leaves {
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.r = d / 2;
    }
    
    display() {
        push();
        translate(this.x, this.y);

        stroke('#ff0000');
        strokeWeight(2);
        noFill();
        square(0, 0, 2 * this.r);

        strokeWeight(1.5);
        let size = 20;
        this.branch(0, 0, size);
        pop();
    }

    branch(x, y, size) {
        push();
        translate(random(2 * this.r), y + 2 * this.r);
        let a = radians(random(-5, 5));
        rotate(a);

        fill(225);
        stroke(255);
        let h = 100;
        line(0, 0, 0, -h);

        noStroke();
        let c = 1;
        if (random(1) < 0.5) c = -1;
        this.leaf(0, -10, size-8, -1);
        this.leaf(0, -25, size-5, 1);
        this.leaf(0, -40, size-2, -1);
        this.leaf(0, -55, size, 1);
        
        let p1 = createVector(-15, 35);
        let p2 = createVector(15, 35);
        let rot = 35;
        
        push();
        translate(0, -h);
        for (let i = 0; i < 360/rot; i++) {
            bezier(
                0, 0,
                p1.x + int(random(-5, 5)), p1.y + int(random(-5, 5)),
                p2.x + int(random(-5, 5)), p2.y + int(random(-5, 5)),
                0, 0
            );
            rotate(radians(rot));
        }

        fill(255, 255, 0);
        circle(0, 0, 10);
        pop();
        pop();
    }
    
    leaf(x, y, size, dir) {
        push();
        translate(x, y);
        scale(size);
        
        noStroke();
        beginShape();
        vertex(1*dir, -0.7);
        bezierVertex(1*dir, -0.7, 0.4*dir, -1, 0, 0);
        bezierVertex(0, 0, 1*dir, 0.4, 1*dir, -0.7);
        endShape();
        pop();
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
