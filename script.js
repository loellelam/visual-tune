let myFont;
let start = false;
let music;
let amp;
let audioContext, analyzer;
let audioAnalysis = {}; // store audio analysis data

let ps = []; // array of particle systems
let noiseSlider;
let sfSlider;

function preload() {
    soundFormats('mp3');
    music = loadSound('assets/once-in-paris.mp3');
    myFont = loadFont('fonts/ARIAL.TTF');
}

function setup() {
    let cnv = createCanvas(800, 600, WEBGL);
    cnv.parent('canvasContainer');
    cnv.center("horizontal");
    cnv.mousePressed(canvasPressed);

    // Initialize the Meyda Analyzer
    audioContext = getAudioContext();
    analyzer = Meyda.createMeydaAnalyzer({
        "audioContext": audioContext,
        "source": music,
        "bufferSize": 512,
        "featureExtractors": ["rms", "perceptualSharpness", "spectralSlope", "chroma", "perceptualSpread"],
        "callback": features => {
            for (let feature in features) {
                audioAnalysis[feature] = features[feature];
            }
        }
    });
    analyzer.start();

    // Instantiate
    amp = new p5.Amplitude();

    textFont(myFont);
    textSize(36);;
    // text("Noise", 0, 910)
    noiseSlider = createSlider(0, 10, 0.5);
    noiseSlider.position(5, 170);
    noiseSlider.input(updateNoiseMagnitude);

    sfSlider = createSlider(1, 10);
    sfSlider.position(5, 250);
    sfSlider.input(updateStrengthFactor);
}

function draw() {
    background(40);

    // Process amp
    let level = amp.getLevel();
    // let boundLevel = map(level, 0, 1, 0, 20);
    // sphere(size, 10, 3);

    for (let i = 0; i < 3; i++) {
        if (ps[i]) {
            ps[i].run(audioAnalysis, level);
        }
    }
    
}

function canvasPressed() {
    // playing a sound file on a user gesture is equivalent to `userStartAudio()`
    if (!start) {
        music.play();
        start = true;
    }

    // generate 3 particle systems
    ps.push(new ParticleSystem({
        density: 200,
        color: color(100, 0, 150),
        shape: "circle",
        chromaticTone: 0 // 0 = C, 1= Bb, ...
    }));
    ps.push(new ParticleSystem({
        density: 100,
        color: color(0, 100, 150),
        chromaticTone: 5 // 0 = C, 1= Bb, ...
    }));
    ps.push(new ParticleSystem({
        density: 50,
        color: color(100, 150, 0),
        chromaticTone: 8 // 0 = C, 1= Bb, ...
    }));
    for (let i = 0; i < 3; i++) {
        ps[i].start();
    }

}

function updateNoiseMagnitude() {
    let value = noiseSlider.value();
    if (ps[0]) {
        ps[0].setNoiseMagnitude(value);
    }
}

function updateStrengthFactor() {
    let value = sfSlider.value();
    if (ps[0]) {
        ps[0].setStrengthFactor(value);
    }
}