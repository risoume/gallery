// Risou, 2023
// risoume.github.io

let title = "Desert";

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
    cloud();
    wave();
}

function cloud() {
    let sw = 40; // strokeWeight
    let x = sw / 2;

    while (x < 290) {
        strokeWeight(sw);
        
        // Left
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

        // Right
        y = int(random(10, 40));
        while (true) {
            let y2 = int(random(10, 40));
            
            stroke(random(palette));
            line(600-x, y, 600-x, y + y2);

            if (y + y2 >= height-200) {
                line(600-x, y, 600-x, height);
                break;
            }

            y += y2;
        }

        x += sw / 2;
        let d = abs(x - width / 2);
        sw = map(d, 0, width / 2, 2, 35);
        x += sw / 2;
    }
}

function wave() {
    noStroke();
    let k = 4; // number of waves
    for (let i = 0; i < k; i++) {
        fill(random(palette));
        let yoff = random();

        beginShape(); 
        let xoff = 0;
        for (let x = 0; x <= width; x += 8) {
            let y = map(noise(xoff, yoff), 0, 1, 400 + i*200/k, 400 + i*200/k+30);
            vertex(x, y); 
            xoff += 0.05;
        }
        yoff += random(0.1, 0.2);
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);
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
