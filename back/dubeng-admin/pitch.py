import librosa
import numpy as np
import wave
import json
import logging
# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)


def getPitches(userId):
    # Load the audio file
    path = './download/output/'+userId + '/vocals.wav'
    y, sr = librosa.load(path)

    # Calculate pitch using pyin
    f0, voiced_flag, voiced_probs = librosa.pyin(
        y, fmin=librosa.note_to_hz('F2'), fmax=librosa.note_to_hz('C5'))

    with wave.open(path, 'rb') as wav_file:
        framerate = wav_file.getframerate()
        frames = wav_file.getnframes()
        duration = frames / float(framerate)
        logging.info("Duration: %s seconds", duration)
    standard = int(len(f0)/duration)

    idx = 0
    pitch = list()
    sum = 0

    result = {
        "pitch": json.dumps(f0.tolist()),
        "standard": standard
    }
    return result
