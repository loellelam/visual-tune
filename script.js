let music;
let amp;
let audioContext, analyzer;
let audioAnalysis = {}; // store audio analysis data

let ps;
let slider;

function preload() {
    soundFormats('mp3');
    music = loadSound('assets/once-in-paris.mp3');
}

function setup() {
    let cnv = createCanvas(800, 600, WEBGL);
    cnv.center("horizontal");
    cnv.mousePressed(canvasPressed);

    // Initialize the Meyda Analyzer
    audioContext = getAudioContext();
    analyzer = Meyda.createMeydaAnalyzer({
        "audioContext": audioContext,
        "source": music,
        "bufferSize": 512,
        "featureExtractors": ["perceptualSharpness", "spectralSlope", "chroma", "perceptualSpread"],
        "callback": features => {
            for (let feature in features) {
                audioAnalysis[feature] = features[feature];
            }
        }
    });
    analyzer.start();

    // Instantiate
    amp = new p5.Amplitude();

    // text("Noise", 0, 610)
    slider = createSlider(0, 10, 0.5);
    slider.position(0, 700);
    slider.input(updateNoiseMagnitude);
}

function draw() {
    background(40);

    // Process amp
    let level = amp.getLevel();
    // let boundLevel = map(level, 0, 1, 0, 20);
    // sphere(size, 10, 3);

    if (ps) {
        ps.run(audioAnalysis, level);
    }

     // Draw based on the RMS value
    // if (typeof rmsValue !== "undefined") {
    //     let ellipseSize = map(rmsValue, 0, 1, 10, 200);
    //     ellipse(width / 2, height / 2, ellipseSize, ellipseSize);
    // }
    
}

function canvasPressed() {
    // playing a sound file on a user gesture
    // is equivalent to `userStartAudio()`
    music.play();

    ps = new ParticleSystem(200);
    ps.start();
}

function updateNoiseMagnitude() {
    let value = slider.value();
    if (ps) {
        ps.setNoiseMagnitude(value);
    }
}