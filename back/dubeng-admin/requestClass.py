from pydantic import BaseModel
from typing import List



class video(BaseModel):
    videoPath:str
    title:str
    runtime:str
    thumbnail:str
    startTime:str
    endTime:str
    producer:str
    gender:str
    lang:str

class script(BaseModel):
    duration:str
    startTime:str
    content:str
    translateContent:str
    isDub:int
