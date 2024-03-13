function ParticleSystem(d) {
    this.radius = 200; // spawnable area
    this.density = d; // num of particles
    this.particleArray = []; // stores all particles

    this.start = function() {
        // generate particles in random positions
        for (let i = 0; i < this.density; i++) {
            let positionX = random(-this.radius, this.radius);
            let positionY = random(-this.radius, this.radius);
            this.particleArray.push(new Particle(createVector(positionX, positionY)));
        }
    }

    this.run = function(amp) {
        for (let i = 0; i < this.particleArray.length; i++) {
            // perform particle calculations
            let particle = this.particleArray[i];
            particle.run(amp);

            // remove expired particles
            if (particle.isExpired()) {
                this.particleArray.splice(i, 1);
            }
        }
    }
}