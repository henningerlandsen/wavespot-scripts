// Sequencer
// ---------

function Sequencer(steps, speed) {
	return {
		output: function(t) {
			return steps[Math.floor((t * _(speed, t)) % steps.length)];
		}
	}
}


var testTone = 86.14;

// Main
// ----

function dsp(t) {
  var speed = 1000;
  var steps = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
  return Sequencer(steps, speed).output(t);
  
	//return Oscillator( Wave.Triangle, Sequencer(sequence, 1), 0.6).output(t);
}
