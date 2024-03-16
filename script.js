let music;
let amp, fft;
let ps;
let slider;

function preload() {
    soundFormats('mp3');
    music = loadSound('assets/once-in-paris.mp3');
}

function setup() {
    let cnv = createCanvas(800, 600, WEBGL);
    cnv.mousePressed(canvasPressed);

    // Instantiate
    amp = new p5.Amplitude();
    fft = new p5.FFT();

    // text("Noise", 0, 610)
    slider = createSlider(0, 10, 0.5);
    slider.position(0, 700);
    slider.input(updateNoiseMagnitude);
}

function draw() {
    background(240);

    // Process amp
    let level = amp.getLevel();
    // let boundLevel = map(level, 0, 1, 0, 20);
    // sphere(size, 10, 3);

    if (ps) {
        ps.run(level);
    }

    // Process freq
    // let spectrum = fft.analyze();
    // for (let i = 0; i< spectrum.length; i++){
    //     let x = map(i, 0, spectrum.length, 0, width);
    //     let h = -height + map(spectrum[i], 0, 255, height, 0);
    //     rect(x, height, width / spectrum.length, h )
    // }
    
    // other interesting audio analysis
    /** getOutputVolume()
     * 
     */
}

function canvasPressed() {
    // playing a sound file on a user gesture
    // is equivalent to `userStartAudio()`
    music.play();

    ps = new ParticleSystem(100);
    ps.start();
}

function updateNoiseMagnitude() {
    let value = slider.value();
    if (ps) {
        ps.setNoiseMagnitude(value);
    }
}