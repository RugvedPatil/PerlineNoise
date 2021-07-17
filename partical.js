class Particle
{
    constructor()
    {
        this.pos = createVector(random(width),random(height));
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = 4;
        this.h = 0;
        this.prevPos = this.pos.copy();
    }

    update()
    {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    follow(vectors)
    {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * col;
        var force = vectors[index];
        this.applyForce(force);
    }
    applyForce(force)
    {
        this.acc.add(force);
    }
    show()
    {
        stroke(this.h, 255, 255, 10);
        this.h = this.h + 1;
        if(this.h > 255)
        {
            this.h = 0;
        }
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }
    updatePrev()
    {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
    edges()
    {
        if(this.pos.x > width)
        {
            this.pos.x = 0;
            this.updatePrev();
        }
        if(this.pos.x < 0)
        {
            this.pos.x = width;
            this.updatePrev();
        }
        if(this.pos.y > height)
        {
            this.pos.y = 0;
            this.updatePrev();
        }
        if(this.pos.y < 0)
        {
            this.pos.y = height;
            this.updatePrev();
        }   
    }
}