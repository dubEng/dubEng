import os
# 2stems = vocals and accompaniment
# 4stems = vocals, drums, bass, and other
# 5stems = vocals, drums, bass, piano, and other
stems = str(input('stems 선택 : 2, 4, 5 >>>'))
# path = str(input(r'파일이 있는 경로를 정해주세요. >>>'))
path = "./"
os.chdir(path)
# file_name = str(input('음악 파일의 이름을 적어주세요. >>>'))
file_name = "audio_example"

nsfile_name = file_name.replace(' ', '_')

try:
    os.rename(path+file_name+'.mp3', path+nsfile_name+'.mp3')
except FileNotFoundError:
    pass
print('기다려주세요.')
spl = r'spleeter separate -p spleeter:' + \
    str(stems)+r'stems -o output '+nsfile_name+'.mp3'
# 'spleeter separate -p spleeter:2stems -o output my_song.mp3'
os.system(spl)
