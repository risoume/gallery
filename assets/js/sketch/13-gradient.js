// Risou, 2023
// risoume.github.io

let title = "Gradient";

let palette = ['#F0D8A8', '#3D1C00', '#86B8B1', '#F2D694', '#FA2A00'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(255);
    noStroke();

    let n = int(random(2, 4));
    let s = width / n;
    let grids = [];
    
    for (let i = 0; i < width; i += s) {
        for (let j = 0; j < width; j += s) {
            if (random() < 0.5) {
                grids.push(
                    new Grid(i, j, s)
                );
            }
            else {
                grids.push(
                    new Grid(i, j, s/2),
                    new Grid(i+s/2, j, s/2),
                    new Grid(i, j+s/2, s/2),
                    new Grid(i+s/2, j+s/2, s/2)
                );
            }
        }
    }

    for (let i = 0; i < grids.length; i++) {
        grids[i].display();
    }
}

class Grid {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
    }
    
    display() {
        let c1 = random(palette);
        let c2 = random(palette);
        
        let d;
        let r, g, b;
        let step = 2;

        for (let i = 0; i < this.s; i += step) {
            for (let j = 0; j < this.s; j += step) {
                d = dist(i, j, this.s/2, this.s/2);
                r = map(d, 0, this.s/2, red(c1), red(c2));
                g = map(d, 0, this.s/2, green(c1), green(c2));
                b = map(d, 0, this.s/2, blue(c1), blue(c2));
                fill(color(r, g, b));
                square(int(this.x) + i, int(this.y) + j, step);
            }
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
