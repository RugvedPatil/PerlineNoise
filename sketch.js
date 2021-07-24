var inc = 0.1;
var scl = 10;
var col,rows;
var z_off = 0;
var fr;
var particles = [];
var flowfield;
const canvas_div = document.getElementById("canvas_div");
const frameRate_div = document.getElementById("frame_rate");

function setup()
{
    const canvas_width = canvas_div.clientWidth;

    const canvas = createCanvas(canvas_width, 480);

    canvas.parent(canvas_div);
    colorMode(HSB, 255)
    col = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');
    fr.parent(frameRate_div);
    flowfield = new Array(col * rows);

    for(var i=0; i < 300; i++)
    {
        particles[i] = new Particle();
    }
    background(0);
}       

function draw()
{  
    var y_off = 0;

    fr.html('frame rate = '+ floor(frameRate()));

    for(var y=0; y<rows; y++)
    {
        var x_off = 0;
        for(var x=0; x<col; x++)
        {
            var index = x+y*col;
            var angle = noise(x_off,y_off,z_off) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            x_off += inc;
            stroke(0, 50);
        }
        y_off += inc;  
        z_off += 0.0003; 
    }
    for(var i=0; i < particles.length; i++)
    {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();
        particles[i].edges();
    }
}