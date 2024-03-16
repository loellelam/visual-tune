function Particle(pos) {
    this.position = pos;
    this.lifetime = random(900.0, 1000.0);
  
    this.run = function(amp, noiseMagnitude) {
        this.update(amp, noiseMagnitude);
        this.display();
    }

    this.update = function(amp, noiseMagnitude) {
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
        noiseForce.mult(noiseMagnitude);
        force.add(noiseForce);

        // add forces to particle
        this.position.add(force);

        // reduce particle lifetime
        this.lifetime -= 1.0;
    }

    this.display = function() {
        let distance = dist(this.position.x, this.position.y, 0, 0);
        let fillColor = map(distance, 0, 300, 0, 255); // adjust fill from black to white based on distance

        fill(fillColor, this.lifetime);
        noStroke();
        circle(this.position.x, this.position.y, 12);
    }

    this.isExpired = function() {
        let expired = false;
        if (this.lifetime < 0.0 || dist(this.position.x, this.position.y, 0, 0) > 300) {
            expired = true;
        }
        return expired;
    }
}