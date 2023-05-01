class video:
    def __init__(self):
        self.title = ""
        self.thumbnail = ""
        self.runtime = 0
        self.videoPath = ""
        self.bgPath = ""
        self.voicePath = ""
        self.startTime = 0
        self.endTime = 0
    
    def set(self, title, thumbnail, runtime, videoPath, bgPath, voicePath, startT, endT):
        self.title = title
        self.thumbnail = thumbnail
        self.runtime = runtime
        self.videoPath = videoPath
        self.bgPath = bgPath
        self.voicePath = voicePath
        self.startTime = startT
        self.endTime = endT

class script:
    def __init__(self):
        self.startTime = 0
        self.duration = 0
        self.content = ""
        self.translate = ""
    
    def set(self, startTime, duration, content, translate):
        self.startTime = startTime
        self.duration = duration
        self.content = content
        self.translate = translate