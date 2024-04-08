function ParticleSystem(d) {
    this.radius = 200; // spawnable area
    this.density = d; // num of particles
    this.particleArray = []; // stores all particles
    this.noiseMagnitude = 2;

    this.start = function() {
        // generate particles in random positions
        for (let i = 0; i < this.density; i++) {
            let positionX = random(-this.radius, this.radius);
            let positionY = random(-this.radius, this.radius);
            this.particleArray.push(new Particle(createVector(positionX, positionY)));
        }
    }

    this.run = function(audioAnalysis, amp) {
        // spawn new particles
        if (this.particleArray.length < this.density * 1.1) {
            let numParticlesToSpawn = map(audioAnalysis.spectralSlope, 0, 1, 2, 1);
            for (let i = 0; i < numParticlesToSpawn; i++) {
                let positionX = random(-this.radius, this.radius);
                let positionY = random(-this.radius, this.radius);
                this.particleArray.push(new Particle(createVector(positionX, positionY)));
            }
        }

        for (let i = 0; i < this.particleArray.length; i++) {
            // perform particle calculations
            let particle = this.particleArray[i];
            particle.run(audioAnalysis, amp, this.noiseMagnitude);

            // remove expired particles
            if (particle.isExpired()) {
                this.particleArray.splice(i, 1);
            }
        }
    }

    ParticleSystem.prototype.setNoiseMagnitude = function(value) {
        this.noiseMagnitude = value;
    };
}