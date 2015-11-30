
// Parameter interpreter
// ---------------------

function _(input, t, def) {
	while (typeof(input) === "function") {
		input = input(t);
	}
	if (input === undefined) {
		return def || 0;
	}
	return input;
}


// Waveforms
// ---------

var Wave = {
	Sine: function(freq) {
		return function(t) {
			return Math.sin(Math.PI * 2 * t * _(freq, t));
		};
	},

	Square: function(freq) {
		return function(t) {
			return 1 - ((t * 2 * _(freq, t)) & 1 ) * 2;
		};
	},
	
	Pulse: function(freq, mod) {
    return function(t) {
      return ((t * freq * 0.5) % 1) > _(mod, t) ? -1 : 1;
    };
	},

	Saw: function(freq) {
		return function(t) {
			return - 1 + ((t * _(freq, t)) % 1) * 2;
		};
	},

	Triangle: function(freq) {
		return function(t) {
			var f = _(freq, t) * t;
			var sign = (f % 1) > 0.5 ? 1 : -1;
			return sign + ((f*2 % 1) * 2) * -sign; 
		};
	}
};


// Amplifier
// ---------

function Amplifier(signal, amplitude, offset) {
	return function(t) {
		return _(amplitude, t, 1) * _(signal, t) + _(offset, t, 0);
	};
}


// Sequencer
// ---------

function Sequencer(steps, speed) {
	return function(t) {
		return steps[Math.floor((t * _(speed, t, 1)) % steps.length)];
	};
}



// Main
// ====

var last = 0;

function dsp(t) {
  var base = 85.75*8;
	var freq = Sequencer([base/5, 0, base/5, 0, base/5, base/6, base/8], 3 );
  var osc1 = Wave.Saw(freq)(t);
  var osc2 = Wave.Saw(Amplifier(freq, 8.986/6, 0))(t);
  var osc3 = Wave.Square(Amplifier(freq, 0.5, 0))(t) * 0.7;
  
  var osc4 = Wave.Pulse(base, Amplifier(Wave.Triangle(1), 0.15, 0.5))(t);
  osc4 = Amplifier(osc4, Amplifier(Wave.Saw(2), -0.5, 0.5))(t);
  
  var input = (osc1 + osc2 + osc3) * 0.3 + osc4 * 0.3;
  
  var lfo = Amplifier(Wave.Triangle(0.01), 0.5, 0.5)(t);
  
  var output = last * lfo + input * (1-lfo);
  last = output;
  
  return output;
}






