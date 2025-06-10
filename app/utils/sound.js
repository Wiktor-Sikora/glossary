/**
 * Play a tone based on the value of a sorting element.
 * @param {number} value        – current Value
 * @param {number} maxValue      – max Value
 * @param {number} volume       – volume (0-1)
 * @param {number} duration     – duration [s]
 */
export function playDynamicTone(value, maxValue, volume, duration) {
    const frequency = 120 + (value / maxValue) * 110; // Map to 120 – 1220 Hz

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);

    oscillator.onended = () => ctx.close();
}