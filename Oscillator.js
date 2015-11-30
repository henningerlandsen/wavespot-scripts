
// Input adapter
// -------------
function _(input, t, def) {
  return (!input && def) || input.output && input.output(t) || input || 0;
}


// Waveforms
// ---------

var Wave = {
	Sine: { 
		output: function(t) {
			return Math.sin(Math.PI * 2 * t);
		}
	},

	Square: {
		output: function(t) {
			return 1 - ((t * 2) & 1 ) * 2;
		}
	},

	Saw: {
		output: function(t) {
			return - 1 + (t % 1) * 2;
		}
	},

	Triangle: {
		output: function(t) {
			var sign = ((t) % 1) > 0.5 ? 1 : -1;
			return sign + ((t*2 % 1) * 2) * -sign; 
		}
	}
}

// Oscillator
// ----------

function Oscillator(wave, frequency, amplitude, offset) {
	return {
		output: function(t) {
			return _(amplitude, t, 1) * _( _(wave, t, Wave.Sine), t * _(frequency, t)) + _(offset, t, 0);
		}
	}
}


// Sequencer
// ---------

function Sequencer(steps, speed) {
	return {
		output: function(t) {
			return steps[Math.floor((t * _(speed, t, 1)) % steps.length)];
		}
	}
}



// Main
// ----

function dsp(t) {
  var wave = Sequencer( [Wave.Triangle, Wave.Saw, Wave.Sine, Wave.Square], 0.2);
  var freq = Sequencer( [440/4, 440/3, 440/5, 440/2], 2 );
	return Oscillator( wave, freq, 0.6, 0).output(t);
}






