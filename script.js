let music;
let amp, fft;

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
}

function draw() {
    background(240);

    // Process amp
    let level = amp.getLevel();
    let size = map(level, 0, 1, 5, 40);
    sphere(size, 10, 3);

    // Process freq
    let spectrum = fft.analyze();
    for (let i = 0; i< spectrum.length; i++){
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h )
    }
    
    // other interesting audio analysis
    /** getOutputVolume()
     * 
     */
}

function canvasPressed() {
    // playing a sound file on a user gesture
    // is equivalent to `userStartAudio()`
    music.play();
  }