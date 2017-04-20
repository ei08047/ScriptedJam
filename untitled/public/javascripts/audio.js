/**
 * Created by ei08047 on 20/04/2017.
 */

var context;
window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function sampleOsc() {
    // we create the gain module, named as volume, and connect it to our
    var volume = audioCtx.createGain();
    volume.connect(audioCtx.destination);
    //these sines are the same, exept for the last connect statement.
    //Now they are connected to the volume gain module and not to the au
    var sinea = audioCtx.createOscillator();
    sinea.frequency.value = 440;
    sinea.type = "sine";
    sinea.start();
    sinea.connect(volume);
    var sineb = audioCtx.createOscillator();
    sineb.frequency.value = 523.25;
    sineb.type = "sine";
    sineb.start();
    sineb.connect(volume);
    var sinec = audioCtx.createOscillator();
    sinec.frequency.value = 698.46;
    sinec.type = "sine";
    sinec.start();
    sinec.connect(volume);
    volume.gain.value=0.2;
}

