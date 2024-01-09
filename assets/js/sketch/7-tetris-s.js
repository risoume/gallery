// Risou, 2023
// risoume.github.io

let title = "Tetris-S";

let palette = ['#382F32', '#FFEAF2', '#FCD9E5', '#FBC5D8', '#F1396D'];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    pixelDensity(density);
    noLoop();
}

function draw() {
    background(255);

    // Create a list of s tetris
    let n = int(random(4, 13)); // number of s tetris in a row and a column
    let u = width / (2*n); // length of square tile component of s
    let ss = [];
    for (let i = 0; i < n; i++) {
        ss.push([]);
        for (let j = 0; j < n+1; j++) {
            ss[i].push( new S((j-1)*2*u, i*2*u, n, u) );
        }
    }

    // Different colors for up, down, left, right
    let prev = -1;
    let curr = random(palette);
    
    for (let j = 0; j < n+1; j++) {
        while(prev == curr) {
            curr = random(palette);
        }
        ss[0][j].color = curr;
        prev = curr;
    }
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n+1; j++) {
            while(prev == curr || curr == ss[i-1][j].color) {
                curr = random(palette);
            }
            ss[i][j].color = curr;
            prev = curr;
        }
    }

    // Draw all s tetris
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n+1; j++) {
            fill(ss[i][j].color)
            ss[i][j].draw();
        }
    }


    // Picture

    let x = 160; // top left corner x
    let y = 120; // top left corner y
    let w = width - 2*x; // picture's wide
    let h = height - 2*y; // picture's high
    
    let s = w / 4; // length of square design on frame
    let pad = 8; // thickness of frame
    let n2 = 3; // number of small s tetris in a row and a column
    let u2 = (s-2*pad) / (2*n2); // length of square tile component of s
    
    let small_ss = [];
    for (let i = 0; i < n2; i++) {
        small_ss.push([]);
        for (let j = 0; j < n2+1; j++) {
            small_ss[i].push( new S(width/2-s+pad+(j-1)*2*u2, height/2-s/2+pad+i*2*u2, n2, u2) );
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

    // Draw all small s tetris
    strokeWeight(2);
    for (let i = 0; i < n2; i++) {
        for (let j = 0; j < n2+1; j++) {
            fill(ss[i][j].color)
            small_ss[i][j].draw();
        }
    }

    translate(width/2, height/2);

    stroke(0);
    fill(255);
    rect(0, -s/2, -s, -s); // Up left
    rect(0, s/2, s, s); // Down right
    rect(0, s/2, s, -s); // Center right
    
    beginShape();
    vertex(0, s/2);
    vertex(-s, s/2);
    vertex(-s, -s/2);
    vertex(0, -s/2);
    beginContour();
    vertex(-pad, s/2-pad);
    vertex(-pad, -s/2+pad);
    vertex(-s+pad, -s/2+pad);
    vertex(-s+pad, s/2-pad);
    endContour();
    endShape(CLOSE);

    noStroke();
    fill('#fffbe6');
    rect(-s-1, -s/2, -10, s); // Paint outside
}

// S shape tetris
class S {
    constructor(x, y, n, u) {
        this.x = x;
        this.y = y;
        this.n = n;
        this.u = u;
    }
  
    draw() {
        noStroke();
        square(this.x + 2*this.u, this.y, this.u);
        square(this.x + this.u, this.y + this.u, this.u);
        square(this.x + this.u, this.y, this.u);
        square(this.x, this.y + this.u, this.u);
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
