// Lightweight Web Audio API synthesizer for Matrix & Cyber sounds (zero external assets)
let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function initMatrixAudio(): boolean {
  if (typeof window === 'undefined') return false;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return !!audioCtx;
}

export function setAudioEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (enabled) {
    initMatrixAudio();
  }
}

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

// Matrix single key/click chirp
export function playMatrixKeystroke(freq = 1200, duration = 0.04) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Ignore audio context issues
  }
}

// Digital deconstruction / pixel dissolve static burst
export function playDeconstructSfx() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const bufferSize = audioCtx.sampleRate * 0.12; // 120ms burst
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, audioCtx.currentTime);
    filter.Q.setValueAtTime(3, audioCtx.currentTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
  } catch {
    // Silent catch
  }
}

// Binary decode chirp
export function playGlitchChirp() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    const startFreq = 400 + Math.random() * 300;
    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(startFreq + 1200, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch {
    // Silent catch
  }
}

// Access granted / uplink established
export function playAccessGranted() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.06, audioCtx!.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx!.currentTime + idx * 0.06 + 0.1);

      osc.connect(gain);
      gain.connect(audioCtx!.destination);

      osc.start(audioCtx!.currentTime + idx * 0.06);
      osc.stop(audioCtx!.currentTime + idx * 0.06 + 0.1);
    });
  } catch {
    // Silent catch
  }
}
