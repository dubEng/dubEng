from pydantic import BaseModel

class video(BaseModel):
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

class dbScript(BaseModel):
    def __init__(self):
        self.startTime = 0
        self.duration = 0
        self.isDub = False
    
    def set(self, startTime, duration, isDub):
        self.startTime = startTime
        self.duration = duration
        self.isDub = isDub

class script(BaseModel): 
    def __init__(self):
        self.startTime = 0
        self.duration = 0
    
    def set(self, startTime, duration):
        self.startTime = startTime
        self.duration = duration

class previewReq(BaseModel):
    videoId: int
    nickname: str
    userId: str


class saveReq(BaseModel):
    videoId: int
    userId: str
    url: str
    totalRecordCount: int
    totalRecordTime: int
    runtime: int
    
