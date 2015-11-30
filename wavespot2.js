
function Envelope(a, d, s, r) {
  return {
    attack: a,
    decay: d,
    sustain: s,
    release: r,

    trigger : function(holdTime) {
      
    }
  }
}


function ringMod(a, b, ammount) {
  var makeUp = 1 / ammount;
  ammount *= 0.5;
  return a * (1 - (ammount * (b + 1)));
}



function square(freq, t) {
  return (t * freq * 2) & 1;
}
 
function sine(freq, t) {
  return Math.sin(2 * Math.PI * t * freq);   
}

function dsp(t) {
  var base = 60;
  var a = sine(base, t);
  var b = sine(base * 2 + 0.1, t);
  var c = sine(20 * base / 3 + 0.2, t);
  var ab = ringMod(a, b, 10);
  return 0.1 * ringMod(ab, c, 1);
}
