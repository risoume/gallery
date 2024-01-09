// Risou, 2023
// risoume.github.io

let title = "Tree-2";

let palette_ = [
    ['#F0D8A8', '#3D1C00', '#86B8B1', '#F2D694', '#FA2A00'],
    ['#1B325F', '#9CC4E4', '#E9F2F9', '#3A89C9', '#F26C4F'],
    ['#EDEBE6', '#D6E1C7', '#94C7B6', '#403B33', '#D3643B'],
]

let palette;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    palette = random(palette_);
    background(random(palette));
    noStroke();
    for (let i = 0; i < 30; i++) {
        fill(255 - i*6);
        circle(300, 300, 400 - i*13);
    }

    let left = 0.3;
    let right = 1 - left;

    let trees = [];
    let treeCount = int(random(40, 80));

    for (let i = 0; i < treeCount; i++) {
        trees.push( new Tree(
            int(random(width * left, width * right)),
            int(random(400, height)),
            int(random(20, 150)),
            radians(random(5, 15))
        ) );
    }

    let smallTrees = [];

    for (let i = 0; i < treeCount/2; i++) {
        smallTrees.push( new Tree(
            int(random(0, width * left)),
            int(random(550, height)),
            int(random(10, 20)),
            radians(random(5, 15))
        ) );
    }

    for (let i = -1; i < treeCount/2; i++) {
        smallTrees.push( new Tree(
            int(random(width * right, width)),
            int(random(550, height)),
            int(random(10, 20)),
            radians(random(5, 15))
        ) );
    }

    for (let i = 0; i < treeCount; i++) {
        trees[i].draw();
        smallTrees[i].draw()
    }
}

class Tree {
    constructor(rootX, rootY, h, theta) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.h = h;
        this.theta = theta;
    }

    draw() {
        push();
        translate(this.rootX, this.rootY);
        this.branch(this.h);
        pop();
    }
    
    branch(t) {
        stroke(random(palette));
        let sw = map(t, 2, 100, 1, 5);
        strokeWeight(sw);
        line(0, 0, 0, -t);
        translate(0, -t);
        t *= 0.7;

        if (t > 8) {
            push();
            rotate(this.theta);
            this.branch(t);
            pop();
            
            push();
            rotate(-this.theta);
            this.branch(t);
            pop();
        }
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
