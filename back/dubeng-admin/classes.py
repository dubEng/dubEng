class video:
    def __init__(self):
        self.title = ""
        self.video_path = ""
        self.bg_path = ""       
        self.runtime = 0        
        self.thumbnail = ""
        self.start_time = 0
        self.end_time = 0
        self.producer = ""
        self.gender = ""
        self.voice_path = ""


    
    def set(self, title, thumbnail, runtime, video_path, bg_path, voice_path, start_time, end_time, producer, gender):
        self.title = title
        self.video_path = video_path
        self.bg_path = bg_path   
        self.runtime = runtime       
        self.thumbnail = thumbnail
        self.start_time = start_time
        self.end_time = end_time
        self.producer = producer
        self.gender = gender
        self.voice_path = voice_path

class category:
    def __init__(self):
            self.id = 0
            self.name = ""
    def set(self, id, name):
         self.id = id
         self.name = name