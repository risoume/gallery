// Risou, 2023
// risoume.github.io

let title = "Flower-Leaf";

let palette = ['#00A5E3', '#8DD7BF', '#FF96C5', '#FFBF65'];

let pad = 60;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background('#FF5768');
    translate(pad, pad);
    let s = width - 2*pad;
    let mult = 0.5;

    let grid = new Leaves((s-s*mult)/2, (s-s*mult)/2, s*mult);
    grid.display();
}

class Leaves {
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.r = d / 2;
    }
    
    display() {
        push();
        translate(this.x + this.r, this.y + this.r);

        let p = createVector();
        let q = createVector();

        let points = random(20, 40);
        let size = 20;

        // Optional background
        if (random() < 0.5) {
            for (let i = 0; i < points; i++) {
                q.x = this.r * cos((TWO_PI * i + PI) / points);
                q.y = this.r * sin((TWO_PI * i + PI) / points);
                fill(random(palette));
                this.leaf(q.x, q.y, 16 * size, -1, q.heading());
            }
        }
        
        let inner_size = int(random(10, 13));
        for (let i = 0; i < points; i++) {
            p.x = this.r * cos(TWO_PI * i / points);
            p.y = this.r * sin(TWO_PI * i / points);
            fill(random(palette));
            this.branch(p.x, p.y, size, p.heading());
            
            q.x = this.r * cos((TWO_PI * i + PI) / points);
            q.y = this.r * sin((TWO_PI * i + PI) / points);
            fill(random(palette));
            this.leaf(q.x, q.y, inner_size * size, -1, p.heading());
        }
        pop();
    }

    branch(x, y, size, a) {
        push();
        translate(x, y);
        rotate(a + PI/2);
        fill('#403B33');
        stroke(0);

        let h = 130;
        line(0, 20, 0, -h);

        this.leaf(0, -20, size-8, -1, 0);
        this.leaf(0, -40, size-5, 1, 0);
        this.leaf(0, -60, size-2, -1, 0);
        this.leaf(0, -80, size, 1, 0);
        
        let p1 = createVector(-15, 35);
        let p2 = createVector(15, 35);
        let rot = 35;
        
        push();
        translate(0, -h);
        fill(random(palette));
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
    
    leaf(x, y, size, dir, a) {
        push();
        translate(x, y);
        rotate(a);
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
