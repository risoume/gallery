// Risou, 2023
// risoume.github.io

let title = "Tetris-J";

let palette = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(255);

    // Create a list of j tetris
    let n = int(random(2, 13)); // number of j tetris in a row and a column
    let u = width / n; // length of square tile component of j
    let js = [];
    for (let i = 0; i < n; i++) {
        js.push([]);
        for (let j = 0; j < n; j++) {
            js[i].push( new J(j*u, i*u, u) );
        }
    }

    // Draw all j tetris
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            js[i][j].draw();
        }
    }


    // Picture

    let x = 160; // top left corner x
    let y = 120; // top left corner y
    let w = width - 2*x; // picture's wide
    let h = height - 2*y; // picture's high
    
    let s = w / 4; // length of square design on frame
    let pad = 8; // thickness of frame
    let n2 = 1; // number of small j tetris in a row and a column
    let u2 = (s-2*pad) / n2; // length of square tile component of j
    
    let small_js = [];
    for (let i = 0; i < n2; i++) {
        small_js.push([]);
        for (let j = 0; j < n2; j++) {
            small_js[i].push( new J(width/2+pad+j*u2, height/2+s/2+pad+i*u2, u2) );
        }
    }

    // Frame Shadow
    let off = 12;
    fill(color(0, 0, 0, 90));
    noStroke();
    rect(x-off, y-off, w+2*off, h+2*off);

    // Frame
    fill('#fffbe6');
    stroke('#13151a');
    strokeWeight(pad);
    rect(x, y, w, h);

    stroke(0);
    strokeWeight(2);
    fill(255);
    rect(width/2, height/2 + s/2, s, -s); // Center right
    rect(width/2, height/2 - s/2, s, -s); // Up right
    rect(width/2, height/2 + s/2, -s, s); // Down left
    rect(width/2, height/2 + s/2, s, s); // Down right

    // Draw all small j tetris
    strokeWeight(2);
    for (let i = 0; i < n2; i++) {
        for (let j = 0; j < n2; j++) {
            small_js[i][j].draw();
        }
    }

    stroke(0);
    noFill();
    rect(width/2+pad, height/2+s/2+pad, s-2*pad, s-2*pad);
}

// J shape tetris
class J {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.u = s / 4;
    }
  
    draw() {
        noStroke();
        // Different colors for each J tetris in a tile
        let p = shuffle(palette);

        // Up Left
        fill(p[0]);
        square(this.x, this.y, this.u);
        rect(this.x + this.u, this.y, this.u, 3*this.u);
        
        // Up Right
        fill(p[1]);
        rect(this.x + 2*this.u, this.y, this.u, 3*this.u);
        square(this.x + 3*this.u, this.y, this.u);
        
        // Bottom Left
        fill(p[2]);
        rect(this.x, this.y + this.u, this.u, 3*this.u);
        square(this.x + this.u, this.y + 3*this.u, this.u);
        
        // Bottom Right
        fill(p[3]);
        square(this.x + 2*this.u, this.y + 3*this.u, this.u);
        rect(this.x + 3*this.u, this.y + this.u, this.u, 3*this.u);
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
