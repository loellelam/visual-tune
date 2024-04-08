// const myAudio = document.createElement('audio');
const audioContext = new AudioContext();

// Select the Audio Element from the DOM
const htmlAudioElement = document.querySelector('#myAudio');
// Create an "Audio Node" from the Audio Element
const source = audioContext.createMediaElementSource(htmlAudioElement);
// Connect the Audio Node to your speakers. Now that the audio lives in the
// Audio Context, you have to explicitly connect it to the speakers in order to
// hear it
source.connect(audioContext.destination);

if (typeof Meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
}
else {
    const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ["rms"],
        callback: (features) => {
        console.log(features);
        },
    });
    analyzer.start();
}