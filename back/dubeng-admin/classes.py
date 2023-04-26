class video:
    def __init__(self):
        self.title = ""
        self.videoPath = ""
        self.bgPath = ""       
        self.runtime = 0        
        self.thumbnail = ""
        self.startTime = 0
        self.endTime = 0
        self.producer = ""
        self.gender = ""
        self.voicePath = ""


    
    def set(self, title, thumbnail, runtime, videoPath, bgPath, voicePath, startT, endT, producer, gender):
        self.title = title
        self.videoPath = videoPath
        self.bgPath = bgPath   
        self.runtime = runtime       
        self.thumbnail = thumbnail
        self.startTime = startT
        self.endTime = endT
        self.producer = producer
        self.gender = gender
        self.voicePath = voicePath