
import wave
import struct
import math
import os

def generate_wave(filename, duration, freq_func, volume=0.5, sample_rate=44100):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    n_samples = int(sample_rate * duration)
    with wave.open(filename, 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        for i in range(n_samples):
            t = i / sample_rate
            freq = freq_func(t)
            value = int(volume * 32767.0 * math.sin(2.0 * math.pi * freq * t))
            data = struct.pack('<h', value)
            f.writeframesraw(data)

# Jump: rising frequency
generate_wave('assets/audio/jump.wav', 0.2, lambda t: 400 + 400 * t)

# Collect: short high beep
generate_wave('assets/audio/collect.wav', 0.1, lambda t: 800 + 200 * math.sin(t*20))

# Win: fanfare-ish
def win_freq(t):
    if t < 0.2: return 440
    if t < 0.4: return 554
    if t < 0.6: return 659
    return 880
generate_wave('assets/audio/win.wav', 1.0, win_freq)

# Lose: falling frequency
generate_wave('assets/audio/lose.wav', 0.5, lambda t: 400 - 300 * t)

# Simple BGM loops (sine waves with some modulation)
generate_wave('assets/audio/bgm_menu.wav', 4.0, lambda t: 220 + 5 * math.sin(2 * math.pi * 0.5 * t))
generate_wave('assets/audio/bgm_level1.wav', 4.0, lambda t: 330 + 10 * math.sin(2 * math.pi * 1.0 * t))
generate_wave('assets/audio/bgm_level2.wav', 4.0, lambda t: 277 + 20 * math.sin(2 * math.pi * 0.2 * t))
generate_wave('assets/audio/bgm_level3.wav', 4.0, lambda t: 392 + 15 * math.sin(2 * math.pi * 2.0 * t))

print("Audio files generated.")
