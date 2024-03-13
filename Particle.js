function Particle(pos) {
    this.position = pos;
    this.lifetime = random(900.0, 1000.0);
  
    this.run = function(amp) {
        this.update(amp);
        this.display();
    }

    this.update = function(amp) {
        // calculate force based on amplitude
        let force = createVector(0, 0);
        let distance = dist(this.position.x, this.position.y, 0, 0);
        if (amp < 0.2) {
            force = createVector(-this.position.x, -this.position.y).normalize(); // pull towards origin
        }
        else {
            force = createVector(this.position.x, this.position.y).normalize(); // push away from origin
        }
        // apply force based on distance
        let magnitude = map(distance, 0, width, 1, 0.1);
        force.mult(magnitude);

        // add perlin noise
        let noiseForce = createVector(noise(this.position.x * 0.01, this.position.y * 0.01) - 0.5, noise(this.position.y * 0.01, this.position.x * 0.01) - 0.5);
        noiseForce.mult(2);
        force.add(noiseForce);

        // add forces to particle
        this.position.add(force);

        // reduce particle lifetime
        this.lifetime -= 1.0;
    }

    this.display = function() {
        fill(150, this.lifetime);
        noStroke();
        circle(this.position.x, this.position.y, 12);
    }

    this.isExpired = function() {
        return this.lifetime < 0.0;
    }
}