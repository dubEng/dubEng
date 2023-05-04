import librosa
import numpy as np
import wave


def getPitches(userId):
    # Load the audio file
    path = './output/'+userId + '/vocals.wav'
    y, sr = librosa.load(path)

    # Calculate pitch using pyin
    f0, voiced_flag, voiced_probs = librosa.pyin(
        y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C4'))

    with wave.open(path, 'rb') as wav_file:
        framerate = wav_file.getframerate()
        frames = wav_file.getnframes()
        print(framerate)
        duration = frames / float(framerate)
        print("Duration:", duration, "seconds")

    standard = int(len(f0)/duration)

    idx = 0
    pitch = list()
    sum = 0
    for i in f0:
        if idx == standard:
            pitch.append(sum/standard)
            sum = 0
            idx = 0
        if np.isnan(i):
            sum += 0
        else:
            sum += i
        idx += 1

    return pitch
