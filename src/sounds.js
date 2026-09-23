let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  return audioContext;
}

function tone({
  frequency,
  endFrequency = frequency,
  duration = 0.1,
  volume = 0.1,
  type = "sine",
  delay = 0,
}) {
  const ctx = getAudioContext();

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  const start = ctx.currentTime + delay;
  const end = start + duration;

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    frequency,
    start
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(endFrequency, 1),
    end
  );

  gain.gain.setValueAtTime(volume, start);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    end
  );

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(start);
  oscillator.stop(end);
}


/* -------------------------------------------------------
   CLICK / POP
------------------------------------------------------- */

export function playClick() {
  tone({
    frequency: 500,
    endFrequency: 750,
    duration: 0.08,
    volume: 0.08,
    type: "sine",
  });
}


/* -------------------------------------------------------
   EXCITED SHAKE
------------------------------------------------------- */

export function playShake() {
  const frequencies = [
    350,
    450,
    380,
    500,
    420,
    550,
  ];

  frequencies.forEach((frequency, index) => {
    tone({
      frequency,
      endFrequency: frequency * 1.1,
      duration: 0.06,
      volume: 0.035,
      type: "triangle",
      delay: index * 0.08,
    });
  });
}


/* -------------------------------------------------------
   WHOOSH / ZOOM
------------------------------------------------------- */

export function playWhoosh() {
  tone({
    frequency: 180,
    endFrequency: 900,
    duration: 0.55,
    volume: 0.07,
    type: "sine",
  });

  tone({
    frequency: 300,
    endFrequency: 1400,
    duration: 0.5,
    volume: 0.025,
    type: "triangle",
  });
}


/* -------------------------------------------------------
   CELEBRATION
------------------------------------------------------- */

export function playCelebration() {
  const notes = [
    523.25, // C
    659.25, // E
    783.99, // G
    1046.5, // C
  ];

  notes.forEach((frequency, index) => {
    tone({
      frequency,
      duration: 0.22,
      volume: 0.06,
      type: "sine",
      delay: index * 0.11,
    });
  });
}