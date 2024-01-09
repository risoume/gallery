// Risou, 2023
// risoume.github.io

let title = "Forest";

let palette_ = [
    ['#1B325F', '#9CC4E4', '#E9F2F9', '#3A89C9', '#F26C4F'],
    ['#FFEDBF', '#F7803C' , '#F54828' , '#2E0D23' , '#F8E4C1'],
];

let palette = [];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(255);
    noFill();
    palette = random(palette_);

    let sw = 20; // strokeWeight
    let x = sw / 2;

    while (x < width+50) {
        strokeWeight(sw);
        let y = int(random(10, 40));

        while (true) {
            let y2 = int(random(10, 40));
            stroke(random(palette));
            line(x, y, x, y + y2);

            if (y + y2 >= height-200) {
                line(x, y, x, height);
                break;
            }

            y += y2;
        }

        x += sw/2;
        sw = int(random(5, 30));
        x += sw/2;
    }

    let trees = [];
    let tree_num = 50;

    for (let i = 0; i < tree_num; i++) {
        trees.push( new Tree(
            int(random(5, width-5)),
            int(random(20, 50)),
            radians(random(5, 15))
        ) );
    }

    for (let i = 0; i < tree_num; i++) {
        push();
        trees[i].draw();
        pop();
    }
}

class Tree {
    constructor(rootX, h, theta) {
        this.rootX = rootX;
        this.h = h;
        this.theta = theta;
    }
    
    draw() {
        push();
        translate(this.rootX, height);
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
