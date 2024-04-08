function Particle(pos) {
    this.position = pos;
    this.lifetime = random(100.0, 500.0);
    this.audioAnalysis = {};
  
    this.run = function(audioAnalysis, amp, noiseMagnitude) {
        this.audioAnalysis = audioAnalysis;
        this.audioAnalysis.amp = amp;
        this.audioAnalysis.noiseMagnitude = noiseMagnitude;

        this.update();
        this.display();
    }

    this.update = function() {
        // calculate force based on amplitude
        let force = createVector(0, 0);
        let distance = dist(this.position.x, this.position.y, 0, 0);
        if (this.audioAnalysis.amp < 0.2) {
            force = createVector(-this.position.x, -this.position.y).normalize(); // pull towards origin
        }
        else {
            force = createVector(this.position.x, this.position.y).normalize(); // push away from origin
        }
        // apply force based on distance
        let magnitude = map(distance, 0, width, 1, 0.1);
        force.mult(magnitude);

        // rotational force
        let rotationalForce = createVector(-this.position.y, this.position.x).normalize(); // calculated as a vector perpendicular to the particle's position vector
        rotationalForce.mult(this.audioAnalysis.perceptualSharpness * 2);

        // add perlin noise
        let noiseForce = createVector(noise(this.position.x * 0.01, this.position.y * 0.01) - 0.5, noise(this.position.y * 0.01, this.position.x * 0.01) - 0.5);
        noiseForce.mult(this.audioAnalysis.noiseMagnitude);
        force.add(noiseForce);

        // add forces to particle
        this.position.add(force);
        this.position.add(rotationalForce);

        // reduce particle lifetime
        this.lifetime -= 1.0;
    }

    this.display = function() {
        let distance = dist(this.position.x, this.position.y, 0, 0);
        let fillColor = map(distance, 0, 300, 0, 255); // adjust fill from black to white based on distance

        fill(fillColor, this.lifetime);
        noStroke();
        // let size = map(this.audioAnalysis.perceptualSharpness, 0.4, 0.8, 11, 13);
        circle(this.position.x, this.position.y, 12);
        // sphere(10, 10, 3);
        // translate(this.position.x, this.position.y);
    }

    this.isExpired = function() {
        let expired = false;
        if (this.lifetime < 0.0 || dist(this.position.x, this.position.y, 0, 0) > 300) {
            expired = true;
        }
        return expired;
    }
}